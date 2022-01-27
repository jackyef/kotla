import type { NextPage } from 'next'
import { Guesses } from '@/components/Guesses'
import { GuessForm } from '@/components/GuessForm'
import { useContext } from 'react'
import { KotlaContext } from '@/contexts/Kotla'

const Home: NextPage = () => {
  const { guesses, guess } = useContext(KotlaContext)

  console.log({ guesses })

  const handleSubmit = (cityName: string) => {
    // TODO: Handle guess here
    guess(cityName)
  }

  return (
    <>
      <Guesses.Container>
        {guesses.map((guessedCity) => (
          <Guesses.Row key={guessedCity.name} city={guessedCity} />
        ))}
      </Guesses.Container>

      <GuessForm onSubmit={handleSubmit} />
    </>
  )
}

export default Home
