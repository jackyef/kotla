import { useEffect, useState } from 'react'
import { DEFAULT_GAME_STATE, GameState } from '../constants'
import { restoreGameState, storeGameState } from '../storage'
import { getTodayDateString } from '../helpers'

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load game state from local storage initially
    ;(async () => {
      const ds = getTodayDateString()
      const oldGameState = await restoreGameState()

      if (oldGameState.dateString !== ds) {
        // Start a new game
        setGameState(DEFAULT_GAME_STATE)
        storeGameState(DEFAULT_GAME_STATE)
      } else {
        setGameState(oldGameState)
      }
      setIsInitialized(true)
    })()
  }, [])

  useEffect(() => {
    if (gameState && gameState !== DEFAULT_GAME_STATE) {
      // Sync gameState to localStorage on changes
      storeGameState(gameState)
    }
  }, [gameState])

  return [[gameState, setGameState], isInitialized] as const
}
