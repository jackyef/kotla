import { KotlaContext } from '@/contexts/Kotla'
import { getBearing, getDistance } from '@/lib/geo/calc'
import { City } from '@/utils/dataSources/cities'
import clsx from 'clsx'
import { FC, useContext, useMemo } from 'react'
import { Highlight, Letter } from './Highlight'

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

  const distance = useMemo(
    () => getDistance(city, cityOfTheDay),
    [city, cityOfTheDay]
  )
  const distanceString = useMemo(() => `${distance.toFixed(2)} km`, [distance])
  const percentage = useMemo(
    () => ((MAX_DISTANCE_KM - distance) * 100) / MAX_DISTANCE_KM,
    [distance]
  )

  const isCorrectAnswer = city.name === cityOfTheDay.name

  const { emoji: bearingDirectionEmoji, label: bearingDirectionLabel } =
    useMemo(
      () =>
        !isCorrectAnswer
          ? getBearingDirection(getBearing(city, cityOfTheDay))
          : {
              emoji: '📍',
              label: 'Tepat di lokasi kota jawaban'
            },
      [city, cityOfTheDay]
    )

  const getBgClass = () => {
    if (percentage < 33.33) {
      return 'bg-red-50'
    }

    if (percentage < 66.66) {
      return 'bg-yellow-50'
    }

    if (percentage < 99.99) {
      return 'bg-green-50'
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
        'text-xl',
        'flex',
        'flex-col',
        'sm:flex-row',
        'gap-2',
        'rounded-md',
        'py-2',
        'px-4'
      )}
    >
      <div
        className={clsx('flex-1', 'flex', 'items-center', 'overflow-x-auto')}
      >
        <Highlight city={city} cityOfTheDay={cityOfTheDay} />
      </div>
      <div
        className={clsx(
          'flex',
          'gap-2',
          'self-end',
          'sm:self-center',
          'text-sm'
        )}
      >
        <div
          className={clsx('w-32', 'text-right', 'tabular-nums')}
          aria-label={
            !isCorrectAnswer
              ? `${distanceString} ke arah ${bearingDirectionLabel} menuju kota jawaban`
              : bearingDirectionLabel
          }
        >
          {distanceString}
        </div>
        <div aria-hidden>{bearingDirectionEmoji}</div>
      </div>
    </li>
  )
}

export const RowSpacer = () => (
  <li
    className={clsx(
      'bg-transparent',
      'text-xl',
      'flex',
      'flex-col',
      'sm:flex-row',
      'gap-2',
      'rounded-md',
      'py-2',
      'px-4'
    )}
  >
    <Letter>&nbsp;</Letter>
    <div
      className={clsx('flex', 'gap-2', 'self-end', 'sm:self-center', 'text-sm')}
    >
      &nbsp;
    </div>
  </li>
)

export const Guesses = {
  Container,
  Row,
  RowSpacer
}
