import { KotlaContext } from '@/contexts/Kotla'
import clsx from 'clsx'
import { FC, useContext } from 'react'

type StatsProps = {
  label: string | JSX.Element
  value: string | number
}

const StatsItem: FC<StatsProps> = ({ label, value }) => {
  return (
    <div className={clsx('flex', 'flex-col', 'items-center')}>
      <dd className={clsx('text-xl', 'font-semibold')}>{value}</dd>
      <dt className={clsx('text-xs', 'text-gray-500')}>{label}</dt>
    </div>
  )
}

export const Stats = () => {
  const { allTimeStats } = useContext(KotlaContext)
  const { playCount, winCount, currentStreak, longestStreak } = allTimeStats

  return (
    <dl
      className={clsx(
        'grid',
        'grid-cols-2',
        'md:grid-cols-4',
        'gap-2',
        'justify-center'
      )}
    >
      <StatsItem value={playCount} label="Dimainkan" />
      <StatsItem
        value={`${Math.round((winCount * 100) / playCount) || 0}%`}
        label="Kemenangan"
      />
      <StatsItem
        value={currentStreak}
        label={
          <>
            <i>Streak</i> saat ini
          </>
        }
      />
      <StatsItem
        value={longestStreak}
        label={
          <>
            <i>Streak</i> tertinggi
          </>
        }
      />
    </dl>
  )
}
