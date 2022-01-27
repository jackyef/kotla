import type { NextPage } from 'next'
import { FormEvent, useRef } from 'react'
import clsx from 'clsx'
import { Button } from '@/components/inputs/Button'
import { Input } from '@/components/inputs/Input'
import { Guesses } from '@/components/Guesses'

const Home: NextPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(inputRef.current?.value)
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

      <form
        className={clsx('flex', 'gap-2', 'flex-col', 'md:flex-row')}
        onSubmit={handleSubmit}
      >
        <Input
          ref={inputRef}
          className={clsx('flex-1')}
          placeholder="Tebak di sini"
        />
        <Button
          className={clsx(
            'bg-teal-600',
            'text-white',
            'focus:shadow-teal-600',
            'focus:shadow-lg',
            'hover:shadow-teal-600',
            'hover:shadow-lg'
          )}
          type="submit"
        >
          Tebak
        </Button>
      </form>
    </>
  )
}

export default Home
