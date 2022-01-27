import type { NextPage } from 'next'
import { Guesses } from '@/components/Guesses'
import { GuessForm } from '@/components/GuessForm'
import { useContext } from 'react'
import { KotlaContext, MAX_GUESS_COUNT } from '@/contexts/Kotla'

const Home: NextPage = () => {
  const { guesses, guess, gameState, isLoading } = useContext(KotlaContext)

  const handleSubmit = (cityName: string) => {
    // TODO: Handle guess here
    guess(cityName)
  }

  const isGameOver = gameState !== 'in_progress'
  const spacerArray = new Array(MAX_GUESS_COUNT - guesses.length).fill(null)

  return (
    <>
      <Guesses.Container>
        {guesses.map((guessedCity) => (
          <Guesses.Row key={guessedCity.name} city={guessedCity} />
        ))}
        {spacerArray.map((_, i) => (
          <Guesses.RowSpacer key={i} />
        ))}
      </Guesses.Container>

      <GuessForm onSubmit={handleSubmit} disabled={isGameOver || isLoading} />
    </>
  )
}

export default Home
