import clsx from 'clsx'
import type { FC } from 'react'

export const Layout: FC = ({ children }) => {
  return (
    <div className={clsx('w-full', 'max-w-2xl', 'p-4', 'mx-auto')}>
      {children}
    </div>
  )
}
