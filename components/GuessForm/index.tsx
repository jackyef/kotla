import { cities, City } from '@/utils/dataSources/cities'
import { REGENCIES_WITH_SAME_NAME } from '@/utils/dataSources/constants'
import { ListBox } from './ListBox'
import clsx from 'clsx'
import { FormEvent, useMemo, useRef, useState } from 'react'
import { Button } from '../inputs/Button'
import { Input } from '../inputs/Input'

type Props = {
  onSubmit: (guess: string) => void
  disabled?: boolean
}

export const filterCities = (query: string): City[] => {
  const words = query.split(' ').map((word) => word.toLowerCase())

  return cities
    .filter((c) => words.every((word) => c.name.toLowerCase().includes(word)))
    .slice(0, 20)
}

export const GuessForm = ({ onSubmit, disabled }: Props) => {
  const [value, setValue] = useState('')
  const [shouldShowOptionsList, setShouldShowOptionsList] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const returnFocusToInput = () => {
    setShouldShowOptionsList(false)
    inputRef.current?.focus()
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const activeElement = document.activeElement
    const container = e.currentTarget

    if (!activeElement) return

    const focusableElements = Array.from(
      container.querySelectorAll('button[role="listitem"]')
    )

    const activeElementIndex = focusableElements.findIndex(
      (el) => el === activeElement
    )

    // Move focus with arrow keys
    if (e.key === 'ArrowUp') {
      e.preventDefault()

      const newIndex = (activeElementIndex + 1) % focusableElements.length
      ;(focusableElements[newIndex] as HTMLElement)?.focus()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()

      const newIndex =
        activeElementIndex === 0
          ? focusableElements.length - 1
          : activeElementIndex - 1

      ;(focusableElements[newIndex] as HTMLElement)?.focus()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      returnFocusToInput()
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (value) {
      onSubmit(value)

      setValue('')
      returnFocusToInput()
    }
  }

  const filteredCities = useMemo(() => {
    return filterCities(value)
  }, [value])

  const [shownValue] = value.split('__')

  return (
    <>
      {shouldShowOptionsList && (
        <div
          aria-label="Tutup daftar kota"
          className={clsx('fixed', 'inset-0')}
          onClick={() => {
            setShouldShowOptionsList(false)
          }}
        />
      )}
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
        <div
          className={clsx('relative', 'flex-1', 'flex')}
          onKeyDown={handleKeyDown}
        >
          <Input
            ref={inputRef}
            value={shownValue}
            className={clsx('flex-1')}
            placeholder="Tebak di sini"
            onChange={(e) => {
              setValue(e.target.value)
              setShouldShowOptionsList(Boolean(e.currentTarget.value))
            }}
          />
          {shouldShowOptionsList && (
            <ListBox.Container>
              {filteredCities.map((c) => {
                const shouldShowLabel = Boolean(
                  REGENCIES_WITH_SAME_NAME[c.name]
                )

                return (
                  <ListBox.Item
                    key={`${c.name}__${c.type}`}
                    value={`${c.name}__${c.type}`}
                    query={value}
                    label={shouldShowLabel ? `(${c.type})` : undefined}
                    onClick={(newValue) => {
                      setValue(newValue)
                      returnFocusToInput()
                    }}
                  />
                )
              })}
            </ListBox.Container>
          )}
        </div>
        <Button disabled={disabled} type="submit">
          Tebak
        </Button>
      </form>
    </>
  )
}
