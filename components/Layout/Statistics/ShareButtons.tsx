import { Button } from '@/components/inputs/Button'
import { KotlaContext } from '@/contexts/Kotla'
import { getBearing, getBearingDirection, getDistance } from '@/lib/geo/calc'
import { toast } from '@/lib/toast'
import { City } from '@/utils/dataSources/cities'
import clsx from 'clsx'
import { useContext, useEffect, useState } from 'react'
import { Share2, Twitter } from 'react-feather'

const FIRST_KOTLA_DATE = new Date('2022-01-29')

const getKotlaSeriesNumber = () => {
  const today = new Date()

  return String(
    Math.ceil(
      (today.getTime() - FIRST_KOTLA_DATE.getTime()) / (1000 * 3600 * 24)
    )
  )
}

const getLetterBoxes = (guess: City, answer: City) => {
  const foundLetters: Record<string, boolean> = {}

  let output = guess.name
    .split('')
    .map((letter, index) => {
      if (index > answer.name.length - 1) {
        return
      }

      if (answer.name.includes(letter)) {
        foundLetters[letter] = true
      }

      if (foundLetters[letter]) {
        if (letter === answer.name[index]) {
          return '🟩'
        } else {
          return '🟨'
        }
      } else {
        return '⬜'
      }
    })
    .join('')

  if (answer.name.length - guess.name.length > 0) {
    const remainingLetters = new Array(
      answer.name.length - guess.name.length
    ).fill(null)

    remainingLetters.forEach(() => {
      // pad with '⬛'
      output += '⬛'
    })
  }

  return output
}

const getGuessSymbol = (guess: City, answer: City) => {
  const distance = getDistance(guess, answer)
  const decimalDigits = distance < 100 ? 1 : 0

  return `${distance.toFixed(decimalDigits)} km ${
    distance === 0 ? '📍' : getBearingDirection(getBearing(guess, answer)).emoji
  }`
}

const template = `Kotla :kotlaSeries: :guessCount:/6

:guess0:
:guess1:
:guess2:
:guess3:
:guess4:
:guess5:

https://kotla.vercel.app
`

const today = new Date()
const tomorrow = new Date()
tomorrow.setDate(today.getDate() + 1)
tomorrow.setHours(0, 0, 0, 0)

const Countdown = () => {
  const [_, forceUpdate] = useState(true)
  const now = new Date()

  useEffect(() => {
    setInterval(() => {
      forceUpdate((prev) => !prev)
    }, 1000)
  }, [])

  const remainingHours = Math.floor(
    (tomorrow.getTime() - now.getTime()) / (1000 * 3600)
  )
  const remainingMinutes = Math.floor(
    ((tomorrow.getTime() - now.getTime()) / (1000 * 60)) % 60
  )
  const remainingSeconds = Math.floor(
    ((tomorrow.getTime() - now.getTime()) / 1000) % 60
  )

  useEffect(() => {
    if (
      remainingHours === 0 &&
      remainingMinutes === 0 &&
      remainingSeconds === 0
    ) {
      window.location.reload()
    }
  })

  const padWithZero = (num: number) => {
    return num < 10 ? `0${num}` : num
  }

  return (
    <div className={clsx('tabular-nums')}>
      {padWithZero(remainingHours)}:{padWithZero(remainingMinutes)}:
      {padWithZero(remainingSeconds)}
    </div>
  )
}

export const ShareButtons = () => {
  const { guesses, cityOfTheDay, gameState } = useContext(KotlaContext)

  const generateText = () => {
    let output = template
      .replace(':kotlaSeries:', getKotlaSeriesNumber())
      .replace(
        ':guessCount:',
        gameState === 'lost' ? 'X' : String(guesses.length)
      )

    for (let i = 0; i < 6; i += 1) {
      const guess = guesses[i]

      output = output.replace(
        `:guess${i}:\n`,
        guess
          ? `${getLetterBoxes(guess, cityOfTheDay)} ${getGuessSymbol(
              guess,
              cityOfTheDay
            )}\n`
          : ''
      )
    }

    return output
  }

  const handleShare = () => {
    const text = generateText()
    if ('share' in navigator) {
      navigator.share({
        text: text
      })
    } else {
      navigator.clipboard.writeText(text)

      toast.info('Disalin ke clipboard')
    }
  }

  return (
    <div className={clsx('flex', 'justify-center', 'mt-8', 'gap-12')}>
      <div className={clsx('flex', 'flex-col', 'justify-center')}>
        <div className={clsx('text-gray-400')}>Kotla berikutnya</div>
        <div className={clsx('text-2xl', 'text-right')}>
          <Countdown />
        </div>
      </div>
      <div className={clsx('flex', 'flex-col', 'gap-4')}>
        <Button
          onClick={handleShare}
          className={clsx(
            'flex',
            'gap-2',
            'items-center',
            'text-xl',
            'py-4',
            'px-6'
          )}
        >
          Share <Share2 size="1rem" />
        </Button>
        <Button
          onClick={() => {
            window.open(
              `https://twitter.com/intent/tweet?text=${encodeURIComponent(
                generateText()
              )}`,
              '_blank'
            )
          }}
          className={clsx(
            'flex',
            'gap-2',
            'items-center',
            'text-xl',
            'py-4',
            'px-6',
            'text-cyan-800',
            'bg-cyan-100',
            'hover:bg-cyan-200'
          )}
        >
          Share <Twitter size="1rem" />
        </Button>
      </div>
    </div>
  )
}
