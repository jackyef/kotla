import clsx from 'clsx'
import { FC, useMemo } from 'react'

const Container: FC = ({ children }) => {
  return (
    <ol className={clsx('flex', 'flex-col', 'gap-2', 'mb-4')}>{children}</ol>
  )
}

type RowProps = {
  cityName: string
}

// Distance between Sabang and Merauke
const MAX_DISTANCE_KM = 5245

const Row: FC<RowProps> = ({ cityName }) => {
  const percentage = useMemo(() => Math.random() * 100, [])
  const percentageString = `${percentage.toFixed(1)}%`
  const distance = ((percentage * MAX_DISTANCE_KM) / 100).toFixed(2)

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

    return 'bg-gradient-to-r from-teal-600 to-blue-800'
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
        {distance} km
      </div>
      <div className={clsx('w-8')}>↗️</div>
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
