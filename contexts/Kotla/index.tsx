import { cities, City } from '@/utils/dataSources/cities'
import { createContext, FC, useEffect, useState } from 'react'

type KotlaContextValue = {
  cityOfTheDay: City
  isLoading: boolean
  guesses: City[]
  guess: (cityName: string) => void
}

type GameState = {
  guesses: City[]
  state: 'in_progress' | 'won' | 'lost'
}

export const KotlaContext = createContext<KotlaContextValue>({
  cityOfTheDay: null as unknown as City,
  isLoading: true,
  guesses: [],
  guess: () => {}
})

export const KotlaProvider: FC = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true)
  const [cityOfTheDay, setCityOfTheDay] = useState<City>(
    null as unknown as City
  )
  const [gameState, setGameState] = useState<GameState>({
    guesses: [],
    state: 'in_progress'
  }) // Should be synced to local storage

  console.log()

  const guess = (cityName: string) => {
    if (!cityOfTheDay || !cityName) return

    const city = cities.find((city) => city.name === cityName)

    if (!city) {
      // TODO: send toast message
      alert('Kota tidak ada dalam daftar Kotla')

      return
    }

    if (city.name === cityOfTheDay.name) {
      setGameState((prev) => {
        return {
          ...prev,
          guesses: [...prev.guesses, city],
          state: 'won'
        }
      })
    } else if (gameState.guesses.length === 5) {
      setGameState((prev) => {
        return {
          ...prev,
          guesses: [...prev.guesses, city],
          state: 'lost'
        }
      })
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
    if (!cityOfTheDay) {
      // TODO: Load city of the day from API
      setTimeout(() => {
        setCityOfTheDay(cities.find((c) => c.name === 'Pekanbaru') as City)
        setIsLoading(false)
      }, 2000)
    }
  }, [])

  if (!cityOfTheDay && !isLoading) {
    // TODO: Make this prettier
    return <div>Error. Tolong muat ulang halaman.</div>
  }

  return (
    <KotlaContext.Provider
      value={{
        cityOfTheDay,
        isLoading,
        guesses: gameState.guesses,
        guess
      }}
    >
      {children}
    </KotlaContext.Provider>
  )
}
