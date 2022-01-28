import clsx from 'clsx'

export const GuessDistribution = () => {
  const guessesDistribution = [
    [1, 0],
    [2, 1],
    [3, 2],
    [4, 6],
    [5, 9],
    [6, 4]
  ]
  const highestCount = guessesDistribution.reduce(
    (acc, [_, count]) => (acc > count ? acc : count),
    0
  )

  return (
    <>
      <h3 className={clsx('mt-4', 'mb-2')}>Distribusi tebakan</h3>

      <div>
        {guessesDistribution.map(([guess, count]) => {
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
                  'text-right'
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
