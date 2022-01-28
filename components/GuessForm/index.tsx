import { cities } from '@/utils/dataSources/cities'
import clsx from 'clsx'
import { FormEvent, useRef, useState } from 'react'
import { Button } from '../inputs/Button'
import { Input } from '../inputs/Input'

type Props = {
  onSubmit: (guess: string) => void
  disabled?: boolean
}

export const GuessForm = ({ onSubmit, disabled }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [shouldShowOptionsList, setShouldShowOptionsList] = useState(false)

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
      <datalist id="cities">
        {cities.map((city) => (
          <option key={city.name} value={city.name} label={city.name} />
        ))}
      </datalist>
      <Input
        ref={inputRef}
        className={clsx('flex-1')}
        placeholder="Tebak di sini"
        list={shouldShowOptionsList ? 'cities' : undefined}
        onChange={(e) => {
          setShouldShowOptionsList(Boolean(e.currentTarget.value))
        }}
        onBlur={(e) => {
          setShouldShowOptionsList(false)
        }}
      />
      <Button disabled={disabled} type="submit">
        Tebak
      </Button>
    </form>
  )
}
