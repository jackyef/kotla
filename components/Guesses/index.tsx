import {
  getBearing,
  getBearingDirection,
  getDistance,
  MAX_DISTANCE_KM
} from '@/lib/geo/calc'
import { City } from '@/utils/dataSources/cities'
import { REGENCIES_WITH_SAME_NAME } from '@/utils/dataSources/constants'
import clsx from 'clsx'
import { FC, useEffect, useMemo, useRef } from 'react'
import { Highlight, Letter } from './Highlight'

const Container: FC = ({ children }) => {
  return (
    <ol className={clsx('flex', 'flex-col', 'gap-2', 'mb-4')}>{children}</ol>
  )
}

type RowProps = {
  city: City
  cityOfTheDay: City
}

const Row: FC<RowProps> = ({ city, cityOfTheDay }) => {
  const containerRef = useRef<HTMLLIElement>(null)
  const distance = useMemo(
    () => getDistance(city, cityOfTheDay),
    [city, cityOfTheDay]
  )
  const distanceString = useMemo(() => `${distance.toFixed(2)} km`, [distance])
  const percentage = useMemo(
    () => ((MAX_DISTANCE_KM - distance) * 100) / MAX_DISTANCE_KM,
    [distance]
  )

  const isCorrectAnswer =
    city.name === cityOfTheDay.name && city.type === cityOfTheDay.type

  const { emoji: bearingDirectionEmoji, label: bearingDirectionLabel } =
    useMemo(
      () =>
        !isCorrectAnswer
          ? getBearingDirection(getBearing(city, cityOfTheDay))
          : {
              emoji: '📍',
              label: 'Tepat di lokasi kota jawaban'
            },
      [city, cityOfTheDay, isCorrectAnswer]
    )

  useEffect(() => {
    /**
     * Scroll this guess into viewport when added
     * otherwise it might not be obvious on smaller viewport
     */
    containerRef.current?.scrollIntoView?.({
      behavior: 'smooth',
      block: 'end'
    })
  }, [])

  const getBgClass = () => {
    if (percentage < 66.66) {
      return 'bg-red-50 bg-opacity-60'
    }

    if (percentage < 80) {
      return 'bg-yellow-50 bg-opacity-60'
    }

    if (percentage < 99.99) {
      return 'bg-green-50 bg-opacity-60'
    }

    return 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
  }

  if (typeof window === 'undefined') {
    return null
  }

  return (
    <li
      ref={containerRef}
      className={clsx(
        getBgClass(),
        'text-xl',
        'flex',
        'flex-col',
        'sm:flex-row',
        'gap-2',
        'rounded-md',
        'py-2',
        'px-4',
        'md:py-4',
        'scroll-m-28'
      )}
    >
      <div
        className={clsx('flex-1', 'flex', 'items-center', 'overflow-x-auto')}
      >
        <Highlight city={city} cityOfTheDay={cityOfTheDay} />
        {Boolean(REGENCIES_WITH_SAME_NAME[city.name]) && (
          <span
            className={clsx('text-sm', 'text-gray-500', 'ml-2', {
              'text-inherit': isCorrectAnswer
            })}
          >
            ({city.type})
          </span>
        )}
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
    aria-hidden
    className={clsx(
      'bg-transparent',
      'text-xl',
      'flex',
      'flex-col',
      'sm:flex-row',
      'gap-2',
      'rounded-md',
      'py-2',
      'px-4',
      'md:py-4'
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
