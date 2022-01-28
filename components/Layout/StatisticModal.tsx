import { Modal } from '../Modal'
import { Stats } from './Statistics/Stats'
import { GuessDistribution } from './Statistics/GuessDistribution'
import { GameResult } from './Statistics/GameResult'

type Props = {
  onClose: () => void
  isOpen?: boolean
}

export const StatisticModal = ({ onClose, isOpen }: Props) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Statistik">
      <Stats />
      <GuessDistribution />
      <GameResult />
    </Modal>
  )
}
