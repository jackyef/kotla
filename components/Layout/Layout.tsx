import { KotlaContext } from '@/contexts/Kotla'
import clsx from 'clsx'
import { FC, useContext } from 'react'
import { HelpCircle, BarChart2 } from 'react-feather'
import { IconButton } from '../inputs/IconButton'
import { HowToPlayModal } from './HowToPlayModal'
import { StatisticModal } from './StatisticModal'

export const Header = () => {
  const { modalState, closeModal, openModal } = useContext(KotlaContext)

  return (
    <header className={clsx('flex', 'justify-between', 'mb-12')}>
      <IconButton
        aria-label="Bantuan"
        onClick={() => {
          openModal('help')
        }}
      >
        <HelpCircle />
      </IconButton>
      <h1
        className={clsx(
          'text-center',
          'text-3xl',
          'font-bold',
          'text-teal-600',
          'uppercase',
          'tracking-widest'
        )}
      >
        Kotla{' '}
      </h1>
      <IconButton
        aria-label="Statistik"
        onClick={() => {
          openModal('stats')
        }}
      >
        <BarChart2 />
      </IconButton>

      <HowToPlayModal isOpen={modalState === 'help'} onClose={closeModal} />
      <StatisticModal isOpen={modalState === 'stats'} onClose={closeModal} />
    </header>
  )
}

export const Layout: FC = ({ children }) => {
  return (
    <div className={clsx('w-full', 'max-w-2xl', 'p-4', 'mx-auto')}>
      <Header />
      <main>{children}</main>
    </div>
  )
}
