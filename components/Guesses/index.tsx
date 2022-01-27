import { KotlaContext } from '@/contexts/Kotla'
import { getBearing, getDistance } from '@/lib/geo/calc'
import { City } from '@/utils/dataSources/cities'
import clsx from 'clsx'
import { FC, useContext, useMemo } from 'react'

const Container: FC = ({ children }) => {
  return (
    <ol className={clsx('flex', 'flex-col', 'gap-2', 'mb-4')}>{children}</ol>
  )
}

type RowProps = {
  city: City
}

// Distance between Sabang and Merauke
const MAX_DISTANCE_KM = 5245

const getBearingDirection = (bearingDegree: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const
  const emoji = {
    N: '⬆️',
    NE: '↗️',
    E: '➡️',
    SE: '↘️',
    S: '⬇️',
    SW: '↙️',
    W: '⬅️',
    NW: '↖️'
  } as const
  const label = {
    N: 'Utara',
    NE: 'Timur Laut',
    E: 'Timur',
    SE: 'Tenggara',
    S: 'Selatan',
    SW: 'Barat Data',
    W: 'Barat',
    NW: 'Barat Laut'
  } as const
  const index = Math.round((bearingDegree + 11.25) / 22.5) % 8

  return {
    emoji: emoji[directions[index]],
    label: label[directions[index]]
  }
}

const Row: FC<RowProps> = ({ city }) => {
  const { cityOfTheDay } = useContext(KotlaContext)

  const cityName = city.name
  const distance = useMemo(
    () => getDistance(city, cityOfTheDay),
    [city, cityOfTheDay]
  )
  const distanceString = useMemo(() => `${distance.toFixed(2)} km`, [distance])
  const percentage = useMemo(
    () => ((MAX_DISTANCE_KM - distance) * 100) / MAX_DISTANCE_KM,
    [distance]
  )
  const percentageString = useMemo(
    () => `${percentage.toFixed(1)}%`,
    [percentage]
  )
  const { emoji: bearingDirectionEmoji, label: bearingDirectionLabel } =
    useMemo(
      () =>
        percentage < 100
          ? getBearingDirection(getBearing(city, cityOfTheDay))
          : {
              emoji: '📍',
              label: 'Tepat di lokasi kota jawaban'
            },
      [city, cityOfTheDay]
    )

  const getBgClass = () => {
    if (percentage < 33.33) {
      return 'bg-red-100'
    }

    if (percentage < 66.66) {
      return 'bg-yellow-100'
    }

    if (percentage < 99.99) {
      return 'bg-green-100'
    }

    return 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
  }

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <li
      className={clsx(
        getBgClass(),
        'flex',
        'gap-2',
        'rounded-md',
        'py-2',
        'px-4'
      )}
    >
      <div className={clsx('flex-1')}>{cityName}</div>
      <div className={clsx('w-32', 'text-right', 'tabular-nums')}>
        {distanceString}
      </div>
      <div
        className={clsx('w-8')}
        aria-label={
          percentage < 100
            ? `${bearingDirectionLabel} menuju kota jawaban`
            : bearingDirectionLabel
        }
      >
        {bearingDirectionEmoji}
      </div>
      <div className={clsx('w-16', 'text-right', 'tabular-nums')}>
        {percentageString}
      </div>
    </li>
  )
}

export const Guesses = {
  Container,
  Row
}
