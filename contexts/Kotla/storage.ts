import * as localForage from 'localforage'
import {
  AllTimeStats,
  DEFAULT_ALL_TIME_STATS,
  DEFAULT_GAME_STATE,
  GameState
} from './constants'

localForage.config({
  driver: localForage.LOCALSTORAGE,
  name: '__kotla',
  version: 1 // Changes in type GameState and AllTimeStats should bump this number,
})

const GAME_STATE_KEY = 'gameState'

export const storeGameState = (state: GameState) => {
  localForage.setItem(GAME_STATE_KEY, state)
}

export const restoreGameState = async (): Promise<GameState> => {
  try {
    const restoredGameState = await localForage.getItem(GAME_STATE_KEY)

    if (!restoredGameState) throw new Error()

    return restoredGameState as GameState
  } catch {
    return DEFAULT_GAME_STATE
  }
}

const ALL_TIME_STATS_KEY = `allTimeStats`

export const storeAllTimeStats = (state: AllTimeStats) => {
  localForage.setItem(ALL_TIME_STATS_KEY, state)
}

export const restoreAllTimeStats = async (): Promise<AllTimeStats> => {
  try {
    const restoredAllTimeStats = await localForage.getItem(ALL_TIME_STATS_KEY)

    if (!restoredAllTimeStats) throw new Error()

    return restoredAllTimeStats as AllTimeStats
  } catch {
    return DEFAULT_ALL_TIME_STATS
  }
}
