import { cities, City } from '@/utils/dataSources/cities'
import { createContext, FC, useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { AllTimeStats, DEFAULT_ALL_TIME_STATS, GameState } from './constants'
import { useAllTimeStats } from './hooks/useAllTimeStats'
import { useGameState } from './hooks/useGameState'
import { restoreNumberOfTheDay, storeNumberOfTheDay } from './storage'
import { getTodayDateString } from './helpers'
import { toast } from '@/lib/toast'
import { REGENCIES_WITH_SAME_NAME } from '@/utils/dataSources/constants'
import { trackEvent } from '@/lib/analytics/track'

export type ModalState = 'help' | 'stats' | null

type KotlaContextValue = {
  cityOfTheDay: City
  isLoading: boolean
  hasError: boolean
  guesses: City[]
  guess: (cityName: string) => void
  gameState: GameState['state']
  allTimeStats: AllTimeStats
  modalState: ModalState
  closeModal: () => void
  openModal: (modalState: ModalState) => void
}

export const KotlaContext = createContext<KotlaContextValue>({
  cityOfTheDay: null as unknown as City,
  isLoading: true,
  hasError: false,
  guesses: [],
  guess: () => {},
  gameState: 'in_progress',
  allTimeStats: DEFAULT_ALL_TIME_STATS,
  modalState: null,
  closeModal: () => {},
  openModal: () => {}
})

export const MAX_GUESS_COUNT = 6

export const KotlaProvider: FC = ({ children }) => {
  const [modalState, setModalState] = useState<ModalState>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cityOfTheDay, setCityOfTheDay] = useState<City>(
    null as unknown as City
  )
  const [[gameState, setGameState], isGameStateInitialized] = useGameState()
  const [[allTimeStats, setAllTimeStats], isAllTimeStatsInitialized] =
    useAllTimeStats()

  const openModal = (newModalState: ModalState) => {
    setModalState(newModalState)
  }

  const guess = (guessed: string | `${string}__${string}`) => {
    if (!cityOfTheDay || !guessed) return

    // The `guessed` string can either be
    // 1. a normal string (when the user immediately submit without clicking on one of the autocomplete options)
    // 2. a `cityName__cityType` string (when the user clicks on one of the autocomplete options)
    // This is required to handle names that can be either kabupaten or kota
    // e.g.: Kabupaten Madiun and Kota Madiun
    // In all places where we display the name though, we only show the cityName
    // by doing const [shownValue] = value.split('__')
    const [cityName, cityType] = guessed.split('__')
    const lowercasedCityName = cityName.toLowerCase()

    const possibleCities = cities.filter(
      (city) => city.name.toLowerCase() === lowercasedCityName
    )

    if (possibleCities.length === 0) {
      toast.error('Kota tidak ada dalam daftar Kotla')

      return
    }

    if (possibleCities.length === 2 && !cityType) {
      toast.error(
        `Silahkan pilih opsi yang spesifik antara kabupaten atau kota "${cityName}"`
      )

      return
    }

    const city =
      possibleCities.length === 2
        ? possibleCities.find((c) => c.type === cityType)
        : possibleCities[0]

    if (!city) {
      toast.error('Kota tidak ada dalam daftar Kotla')

      return
    }

    if (
      gameState.guesses.find((c) => {
        return (
          c.name.toLowerCase() === lowercasedCityName && c.type === city.type
        )
      })
    ) {
      toast.error('Kota sudah ditebak sebelumnya')

      return
    }

    if (city.name === cityOfTheDay.name && city.type === cityOfTheDay.type) {
      setGameState((prev) => {
        const guessCount = prev.guesses.length + 1
        setAllTimeStats((prev) => {
          const isLongestStreak = prev.currentStreak === prev.longestStreak

          return {
            ...prev,
            guessDistribution: prev.guessDistribution.map(([guess, count]) =>
              guessCount === guess ? [guess, count + 1] : [guess, count]
            ) as AllTimeStats['guessDistribution'],
            playCount: prev.playCount + 1,
            winCount: prev.winCount + 1,
            longestStreak: isLongestStreak
              ? prev.longestStreak + 1
              : prev.longestStreak,
            currentStreak: prev.currentStreak + 1
          }
        })

        return {
          ...prev,
          guesses: [...prev.guesses, city],
          state: 'won'
        }
      })

      const guessCount = gameState.guesses.length + 1

      if (guessCount === 1) {
        toast.success('Anjayyy')
      } else if (guessCount <= 2) {
        toast.success('Sakti!')
      } else if (guessCount <= 4) {
        toast.success('Tjakep!')
      } else if (guessCount <= 5) {
        toast.success('Mantap')
      } else {
        toast.success('Nyaris')
      }

      trackEvent(`guess ${guessCount}/6`)

      setTimeout(() => {
        openModal('stats')
        confetti()
      }, 3000)
    } else if (gameState.guesses.length === MAX_GUESS_COUNT - 1) {
      setGameState((prev) => {
        return {
          ...prev,
          guesses: [...prev.guesses, city],
          state: 'lost'
        }
      })

      setAllTimeStats((prev) => {
        return {
          ...prev,
          playCount: prev.playCount + 1,
          currentStreak: 0
        }
      })

      toast.error(
        `Kesempatan habis. Kotla hari ini adalah: ${cityOfTheDay.name} ${
          REGENCIES_WITH_SAME_NAME[cityOfTheDay.name]
            ? `(${cityOfTheDay.type})`
            : ''
        }`
      )

      trackEvent(`guess X/6`)

      setTimeout(() => {
        openModal('stats')
      }, 3000)
    } else {
      setGameState((prev) => {
        return {
          ...prev,
          guesses: [...prev.guesses, city],
          state: 'in_progress'
        }
      })
    }
  }

  useEffect(() => {
    if (isAllTimeStatsInitialized && allTimeStats.playCount === 0) {
      // Onboard new players
      openModal('help')
    }
  }, [allTimeStats, isAllTimeStatsInitialized])

  useEffect(() => {
    if (!cityOfTheDay) {
      const ds = getTodayDateString()

      ;(async () => {
        const { number, dateString } = await restoreNumberOfTheDay()

        if (number === -1 || dateString !== ds) {
          // Need to refetch from the server
          const res = await fetch(`/api/getNumberOfTheDay?ds=${ds}`)
          const json = await res.json()
          const { numberOfTheDay } = json
          const cityIndexOfTheDay = numberOfTheDay % cities.length

          setCityOfTheDay(cities[cityIndexOfTheDay])
          setIsLoading(false)

          storeNumberOfTheDay({
            number: numberOfTheDay,
            dateString: ds
          })
        } else {
          const cityIndexOfTheDay = number % cities.length

          setCityOfTheDay(cities[cityIndexOfTheDay])
          setIsLoading(false)
        }
      })()
    }
  }, [cityOfTheDay])

  return (
    <KotlaContext.Provider
      value={{
        cityOfTheDay,
        hasError: !cityOfTheDay && !isLoading,
        isLoading:
          isLoading || !isGameStateInitialized || !isAllTimeStatsInitialized,
        guesses: gameState.guesses,
        guess,
        gameState: gameState.state,
        allTimeStats,
        modalState,
        closeModal: () => {
          setModalState(null)
        },
        openModal
      }}
    >
      {children}
    </KotlaContext.Provider>
  )
}
