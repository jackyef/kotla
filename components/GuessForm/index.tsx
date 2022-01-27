import clsx from 'clsx'
import { FormEvent, useRef } from 'react'
import { Button } from '../inputs/Button'
import { Input } from '../inputs/Input'

type Props = {
  onSubmit: (guess: string) => void
}

export const GuessForm = ({ onSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (inputRef.current) {
      onSubmit(inputRef.current.value || '')

      inputRef.current.value = ''
    }
  }

  return (
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
  )
}
