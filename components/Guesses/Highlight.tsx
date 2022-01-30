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
      aria-hidden
      className={clsx(
        'inline-flex',
        'w-4',
        'justify-center',
        'font-bold',
        'uppercase',
        {
          'text-green-700': isCorrectIndex,
          'text-yellow-500': isFoundInAnswer,
          'text-white': isCorrectAnswer,
          'text-black': !isCorrectAnswer && !isFoundInAnswer && !isCorrectIndex
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
  const isCorrectAnswer =
    city.name === cityOfTheDay.name && city.type === cityOfTheDay.type
  const lettersOccurence: Record<string, number> = {}
  const cityOfTheDayName = cityOfTheDay.name.toLowerCase()

  cityOfTheDayName.split('').forEach((letter) => {
    lettersOccurence[letter] = lettersOccurence[letter]
      ? lettersOccurence[letter] + 1
      : 1
  })

  return (
    <span
      aria-label={city.name}
      className={clsx('flex', 'gap-1', 'items-center')}
    >
      {city.name.split('').map((letter, index) => {
        letter = letter.toLowerCase()
        let found = false

        if (lettersOccurence[letter] > 0) {
          lettersOccurence[letter] -= 1

          found = true
        }

        if (isCorrectAnswer) {
          return (
            <Letter key={index} isCorrectAnswer>
              {letter}
            </Letter>
          )
        }

        if (found) {
          if (letter === cityOfTheDayName[index]) {
            return (
              <Letter key={index} isCorrectIndex>
                {letter}
              </Letter>
            )
          } else {
            return (
              <Letter key={index} isFoundInAnswer>
                {letter}
              </Letter>
            )
          }
        } else {
          return <Letter key={index}>{letter}</Letter>
        }
      })}
    </span>
  )
}
