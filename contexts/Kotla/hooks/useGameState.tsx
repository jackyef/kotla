import { useEffect, useState } from 'react'
import { DEFAULT_GAME_STATE, GameState } from '../constants'
import { restoreGameState, storeGameState } from '../storage'

export const useGameState = () => {
  const [gameState, setGameState] = useState<GameState>(DEFAULT_GAME_STATE)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load game state from local storage initially
    ;(async () => {
      const oldGameState = await restoreGameState()
      setGameState(oldGameState)
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
