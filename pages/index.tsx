import type { NextPage } from 'next'
import clsx from 'clsx'
import { Guesses } from '@/components/Guesses'
import { GuessForm } from '@/components/GuessForm'

const Home: NextPage = () => {
  const handleSubmit = (guess: string) => {
    console.log(guess)
    // TODO: Handle guess here
  }

  return (
    <>
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

      <Guesses.Container>
        <Guesses.Row cityName="Malang" />
        <Guesses.Row cityName="Pekanbaru" />
        <Guesses.Row cityName="Jakarta" />
      </Guesses.Container>

      <GuessForm onSubmit={handleSubmit} />
    </>
  )
}

export default Home
