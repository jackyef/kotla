import clsx from 'clsx'
import { FC, useState } from 'react'
import { HelpCircle, BarChart2 } from 'react-feather'
import { IconButton } from '../inputs/IconButton'
import { HowToPlayModal } from './HowToPlayModal'

type ModalState = 'help' | 'stats' | null

export const Header = () => {
  const [modalState, setModalState] = useState<ModalState>(null)

  const closeModal = () => {
    setModalState(null)
  }

  return (
    <header className={clsx('flex', 'justify-between', 'mb-12')}>
      <IconButton
        aria-label="Bantuan"
        onClick={() => {
          setModalState('help')
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
      <IconButton aria-label="Statistik">
        <BarChart2 />
      </IconButton>

      <HowToPlayModal isOpen={modalState === 'help'} onClose={closeModal} />
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
