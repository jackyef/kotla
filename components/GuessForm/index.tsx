import { cities } from '@/utils/dataSources/cities'
import clsx from 'clsx'
import { FormEvent, useRef } from 'react'
import { Button } from '../inputs/Button'
import { Input } from '../inputs/Input'

type Props = {
  onSubmit: (guess: string) => void
  disabled?: boolean
}

export const GuessForm = ({ onSubmit, disabled }: Props) => {
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
      className={clsx(
        'py-2',
        'bg-white',
        'flex',
        'gap-2',
        'flex-col',
        'md:flex-row',
        'sticky',
        'bottom-0'
      )}
      onSubmit={handleSubmit}
    >
      {/* <datalist id="cities">
        {cities.map((city) => (
          <option key={city.name} value={city.name} label={city.name} />
        ))}
      </datalist> */}
      <Input
        ref={inputRef}
        className={clsx('flex-1')}
        placeholder="Tebak di sini"
        // list="cities"
      />
      <Button disabled={disabled} type="submit">
        Tebak
      </Button>
    </form>
  )
}
