import { City } from '@/utils/dataSources/cities'
import clsx from 'clsx'
import { FC } from 'react'

type LetterProps = {
  isCorrectIndex?: boolean
  isFoundInAnswer?: boolean
  isCorrectAnswer?: boolean
}

export const Letter: FC<LetterProps> = ({
  isCorrectIndex,
  isCorrectAnswer,
  isFoundInAnswer,
  children
}) => {
  return (
    <span
      className={clsx(
        'inline-flex',
        'w-4',
        'justify-center',
        'font-bold',
        'uppercase',
        {
          'text-green-700': isCorrectIndex,
          'text-yellow-700': isFoundInAnswer,
          'text-white': isCorrectAnswer
        }
      )}
    >
      {children}
    </span>
  )
}

type Props = {
  city: City
  cityOfTheDay: City
}

export const Highlight = ({ city, cityOfTheDay }: Props) => {
  const isCorrectAnswer = city.name === cityOfTheDay.name
  const foundLetters: Record<string, boolean> = {}

  return (
    <span className={clsx('flex', 'gap-1', 'items-center')}>
      {city.name.split('').map((letter, index) => {
        if (cityOfTheDay.name.includes(letter)) {
          foundLetters[letter] = true
        }

        if (isCorrectAnswer) {
          return <Letter isCorrectAnswer>{letter}</Letter>
        }

        if (foundLetters[letter]) {
          if (letter === cityOfTheDay.name[index]) {
            return <Letter isCorrectIndex>{letter}</Letter>
          } else {
            return <Letter isFoundInAnswer>{letter}</Letter>
          }
        } else {
          return <Letter>{letter}</Letter>
        }
      })}
    </span>
  )
}