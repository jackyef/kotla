import { useEffect, useState } from 'react'
import { AllTimeStats, DEFAULT_ALL_TIME_STATS } from '../constants'
import { restoreAllTimeStats, storeAllTimeStats } from '../storage'

export const useAllTimeStats = () => {
  const [allTimeStats, setAllTimeStats] = useState<AllTimeStats>(
    DEFAULT_ALL_TIME_STATS
  )
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    // Load allTimeStats from local storage initially
    ;(async () => {
      const oldAllTimeStats = await restoreAllTimeStats()
      setAllTimeStats(oldAllTimeStats)
      setIsInitialized(true)
    })()
  }, [])

  useEffect(() => {
    if (allTimeStats && allTimeStats !== DEFAULT_ALL_TIME_STATS) {
      // Sync allTimeStats to localStorage on changes
      storeAllTimeStats(allTimeStats)
    }
  }, [allTimeStats])

  return [[allTimeStats, setAllTimeStats], isInitialized] as const
}
