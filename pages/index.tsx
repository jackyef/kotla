import type { NextPage } from 'next'
import { Guesses } from '@/components/Guesses'
import { GuessForm } from '@/components/GuessForm'
import { useContext } from 'react'
import { KotlaContext, MAX_GUESS_COUNT } from '@/contexts/Kotla'
import clsx from 'clsx'

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
      </div>
    )
  }

  const isGameOver = gameState !== 'in_progress'
  const spacerArray = !isLoading
    ? new Array(MAX_GUESS_COUNT - guesses.length).fill(null)
    : new Array(MAX_GUESS_COUNT).fill(null)

  return (
    <>
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
