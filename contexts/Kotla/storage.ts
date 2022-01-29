import * as localForage from 'localforage'
import {
  AllTimeStats,
  ALL_TIME_STATS_KEY,
  DEFAULT_ALL_TIME_STATS,
  DEFAULT_GAME_STATE,
  GameState,
  GAME_STATE_KEY,
  NOTD_KEY
} from './constants'

if (typeof window !== 'undefined' && typeof localForage.config === 'function') {
  localForage.config({
    driver: localForage.LOCALSTORAGE,
    name: '__kotla.1', // Changes in type GameState and AllTimeStats should bump this number
    version: 1
  })
}

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

export type NumberOfTheDay = {
  number: number
  dateString: string
}

export const storeNumberOfTheDay = (notd: NumberOfTheDay) => {
  localForage.setItem(NOTD_KEY, notd)
}

export const restoreNumberOfTheDay = async () => {
  try {
    const restoredNOTD = await localForage.getItem(NOTD_KEY)

    if (!restoredNOTD) throw new Error()

    return restoredNOTD as NumberOfTheDay
  } catch (err) {
    return {
      number: -1,
      dateString: ''
    }
  }
}

export const resetStorage = async () => {
  await localForage.removeItem(NOTD_KEY)
  await localForage.removeItem(GAME_STATE_KEY)
  await localForage.removeItem(ALL_TIME_STATS_KEY)

  window.location.reload()
}
