import type { NextPage } from 'next'
import { Guesses } from '@/components/Guesses'
import { GuessForm } from '@/components/GuessForm'
import { useContext } from 'react'
import { KotlaContext, MAX_GUESS_COUNT } from '@/contexts/Kotla'
import clsx from 'clsx'
import { resetStorage } from '@/contexts/Kotla/storage'
import { MetaTags } from '@/components/MetaTags/MetaTags'
import Image from 'next/image'

const Home: NextPage = () => {
  const { guesses, guess, gameState, isLoading, cityOfTheDay, hasError } =
    useContext(KotlaContext)

  const handleSubmit = (cityName: string) => {
    guess(cityName)
  }

  if (hasError) {
    return (
      <div
        className={clsx(
          'bg-red-100',
          'text-red-800',
          'rounded-lg',
          'p-4',
          'center'
        )}
      >
        Gagal memuat Kotla.
        <br />
        Silahkan muat ulang halaman ini.
        <br />
        <br />
        Jika ini terjadi berulang kali,{' '}
        <button
          onClick={resetStorage}
          className={clsx('rounded-lg', 'underline')}
        >
          bersihkan <i>cache</i> lokal
        </button>
        .
      </div>
    )
  }

  const isGameOver = gameState !== 'in_progress'
  const spacerArray = !isLoading
    ? new Array(MAX_GUESS_COUNT - guesses.length).fill(null)
    : new Array(MAX_GUESS_COUNT).fill(null)

  return (
    <>
      <MetaTags />
      <div className={clsx('w-32', 'h-32', 'relative', 'mx-auto', 'mb-8')}>
        {cityOfTheDay && cityOfTheDay.province && (
          <Image
            layout="fill"
            src={`/provinces/${cityOfTheDay.province.toLowerCase()}.svg`}
            alt="provinsi kotla hari ini"
          />
        )}
      </div>
      <Guesses.Container>
        {!isLoading &&
          guesses.map((guessedCity) => (
            <Guesses.Row
              key={guessedCity.name}
              city={guessedCity}
              cityOfTheDay={cityOfTheDay}
            />
          ))}
        {spacerArray.map((_, i) => (
          <Guesses.RowSpacer key={i} />
        ))}
      </Guesses.Container>

      {!isGameOver && (
        <GuessForm onSubmit={handleSubmit} disabled={isGameOver || isLoading} />
      )}
    </>
  )
}

export default Home
