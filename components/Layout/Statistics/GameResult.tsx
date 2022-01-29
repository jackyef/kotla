import { KotlaContext } from '@/contexts/Kotla'
import clsx from 'clsx'
import { useContext } from 'react'
import { ExternalLink } from 'react-feather'
import { ShareButtons } from './ShareButtons'

const googleMapsUrlTemplate = `https://www.google.com/maps/search/:lat,:lng`

export const GameResult = () => {
  const { gameState, cityOfTheDay } = useContext(KotlaContext)

  if (gameState === 'in_progress') return null

  const googleMapsUrl = googleMapsUrlTemplate
    .replace(':lat', String(cityOfTheDay.lat))
    .replace(':lng', String(cityOfTheDay.lng))

  return (
    <>
      <h3 className={clsx('text-lg', 'mt-4')}>Kotla hari ini</h3>
      <p className={clsx('text-gray-500', 'text-xs')}>
        Mohon untuk tetap dirahasiakan
      </p>

      <div
        className={clsx(
          'border-teal-200',
          'border-solid',
          'border-[1px]',
          'rounded-lg',
          'py-2',
          'px-4',
          'mt-4'
        )}
      >
        <p className={clsx('text-teal-600', 'font-semibold', 'text-base')}>
          {cityOfTheDay.name}
        </p>
        <p className={clsx('text-gray-500', 'text-sm')}>
          {cityOfTheDay.name} adalah sebuah {cityOfTheDay.type} di provinsi{' '}
          {cityOfTheDay.province}
        </p>
        <a
          className={clsx(
            'mt-4',
            'text-teal-600',
            'underline',
            'text-sm',
            'flex',
            'gap-2',
            'items-center'
          )}
          href={googleMapsUrl}
          target="_blank"
          rel="noreferrer"
        >
          Lihat di Google Maps
          <span aria-hidden className={clsx('inline')}>
            <ExternalLink size="1rem" />
          </span>
        </a>
      </div>
      <ShareButtons />
    </>
  )
}
