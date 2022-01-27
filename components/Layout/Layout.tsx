import clsx from 'clsx'
import type { FC } from 'react'

export const Header = () => {
  return (
    <h1
      className={clsx(
        'text-4xl',
        'font-bold',
        'bg-gradient-to-r',
        'from-teal-600',
        'to-blue-800',
        'text-transparent',
        'bg-clip-text',
        'mt-8',
        'mb-12'
      )}
    >
      Kotla{' '}
      <button
        className={clsx(
          'text-sm',
          'decoration-cyan-600',
          'underline',
          'underline-offset-1',
          'decoration-dotted'
        )}
      >
        (Apa ini?)
      </button>
    </h1>
  )
}

export const Layout: FC = ({ children }) => {
  return (
    <div className={clsx('w-full', 'max-w-2xl', 'p-4', 'mx-auto')}>
      <header>
        <Header />
      </header>
      <main>{children}</main>
    </div>
  )
}
