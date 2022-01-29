import { City } from '@/utils/dataSources/cities'
import { getTodayDateString } from './helpers'

export type GameState = {
  guesses: City[]
  state: 'in_progress' | 'won' | 'lost'
  dateString: string
}

export const DEFAULT_GAME_STATE: GameState = {
  guesses: [],
  state: 'in_progress',
  dateString: getTodayDateString()
}

export type AllTimeStats = {
  guessDistribution: [
    [1, number],
    [2, number],
    [3, number],
    [4, number],
    [5, number],
    [6, number]
  ]
  playCount: number
  winCount: number
  currentStreak: number
  longestStreak: number
}

export const DEFAULT_ALL_TIME_STATS: AllTimeStats = {
  guessDistribution: [
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0]
  ],
  playCount: 0,
  winCount: 0,
  currentStreak: 0,
  longestStreak: 0
}

export const GAME_STATE_KEY = 'gameState'
export const ALL_TIME_STATS_KEY = `allTimeStats`
export const NOTD_KEY = `notd`
