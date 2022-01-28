import clsx from 'clsx'
import { FC } from 'react'

type StatsProps = {
  label: string | JSX.Element
  value: string
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
      <StatsItem value="0" label="Dimainkan" />
      <StatsItem value="0" label="Kemenangan" />
      <StatsItem
        value="0"
        label={
          <>
            <i>Streak</i> saat ini
          </>
        }
      />
      <StatsItem
        value="0"
        label={
          <>
            <i>Streak</i> tertinggi
          </>
        }
      />
    </dl>
  )
}
