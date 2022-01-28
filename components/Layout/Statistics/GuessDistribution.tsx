import { KotlaContext } from '@/contexts/Kotla'
import clsx from 'clsx'
import { useContext } from 'react'

export const GuessDistribution = () => {
  const { allTimeStats } = useContext(KotlaContext)
  const { guessDistribution } = allTimeStats

  const highestCount = guessDistribution.reduce(
    (acc, [_, count]) => (acc > count ? acc : count),
    0
  )

  return (
    <>
      <h3 className={clsx('mt-4', 'mb-2', 'text-lg')}>Distribusi tebakan</h3>

      <div>
        {guessDistribution.map(([guess, count]) => {
          return (
            <div key={guess} className={clsx('mb-1', 'flex', 'items-center')}>
              <span
                className={clsx('tabular-nums', 'text-lg', 'font-semibold')}
              >
                {guess}
              </span>
              <div
                className={clsx(
                  'ml-2',
                  'p-2',
                  'inline-block',
                  'bg-teal-100',
                  'tabular-nums',
                  'text-teal-900',
                  'min-w-min',
                  'text-right',
                  'rounded-r-lg'
                )}
                style={{
                  width: `${Math.floor((count / highestCount) * 100)}%`
                }}
              >
                {count}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
