import clsx from 'clsx'
import { FC } from 'react'
import { Guesses } from '../Guesses'
import { Button } from '../inputs/Button'
import { Modal } from '../Modal'

const mockCities = [
  {
    name: 'Bandung',
    lat: -6.95,
    lng: 107.5667,
    province: 'Jawa Barat',
    type: 'kota' as const
  },
  {
    name: 'Medan',
    lat: 3.6667,
    lng: 98.6667,
    province: 'Sumatera Utara',
    type: 'kota' as const
  },

  {
    name: 'Padang',
    lat: -0.9556,
    lng: 100.3606,
    province: 'Sumatera Barat',
    type: 'kota' as const
  }
]

type Props = {
  onClose: () => void
  isOpen?: boolean
}

const Bold: FC = ({ children }) => {
  return <span className="font-semibold">{children}</span>
}

const GuessExplainerParagraph: FC = ({ children }) => {
  return <p className={clsx('text-xs', 'text-gray-500', 'px-2')}>{children}</p>
}

const Paragraph: FC = ({ children }) => {
  return <p className="text-sm text-gray-500 mb-2">{children}</p>
}

export const HowToPlayModal = ({ onClose, isOpen }: Props) => {
  return (
    <Modal onClose={onClose} isOpen={isOpen} title="Cara bermain">
      <Paragraph>
        Tebak <strong className="uppercase">Kotla</strong> dalam 6 kesempatan.
      </Paragraph>
      <Paragraph>
        Setiap tebakan harus merupakan nama kota (atau kabupaten) di Indonesia.
      </Paragraph>
      <Paragraph>
        Setelah jawaban dikirimkan, warna huruf akan berubah untuk menunjukkan
        seberapa dekat tebakanmu dari kota rahasia. Jarak dan arah dari kota
        rahasia juga akan ditampilkan.
      </Paragraph>
      <hr />
      <h3 className={clsx('font-medium', 'text-base', 'my-2')}>Contoh</h3>
      <Guesses.Container>
        <Guesses.Row city={mockCities[0]} cityOfTheDay={mockCities[2]} />
        <GuessExplainerParagraph>
          Huruf <Bold>A</Bold> berada pada posisi yang tepat. Huruf{' '}
          <Bold>N</Bold>, <Bold>D</Bold>, dan <Bold>G</Bold> ada namun posisinya
          belum tepat.
        </GuessExplainerParagraph>
        <GuessExplainerParagraph>
          Kota rahasia berjarak 1040 km ke arah barat laut dari kota ini.
        </GuessExplainerParagraph>
        <div className="mb-2" />

        <Guesses.Row city={mockCities[1]} cityOfTheDay={mockCities[2]} />
        <GuessExplainerParagraph>
          Huruf <Bold>D</Bold>, <Bold>A</Bold>, dan <Bold>N</Bold> berada pada
          posisi yang tepat.
        </GuessExplainerParagraph>
        <GuessExplainerParagraph>
          Kota rahasia berjarak 547 km ke arah selatan dari kota ini.
        </GuessExplainerParagraph>
        <div className="mb-2" />

        <Guesses.Row city={mockCities[2]} cityOfTheDay={mockCities[2]} />
        <GuessExplainerParagraph>
          Kota <span className="font-semibold uppercase">Padang</span> adalah
          kota rahasianya!
        </GuessExplainerParagraph>
      </Guesses.Container>

      <hr className="mb-2" />

      <Paragraph>
        Akan ada <strong className="uppercase">Kotla</strong> baru setiap hari!
      </Paragraph>
      <div className="mt-4 flex justify-end">
        <Button
          type="button"
          className={clsx('inline-flex', 'justify-center')}
          onClick={onClose}
        >
          Oke!
        </Button>
      </div>
    </Modal>
  )
}
