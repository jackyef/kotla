import { getBearing, getDistance } from '@/lib/geo/calc'

describe('utils/geo/calc', () => {
  describe('getBearing', () => {
    it('returns bearing in degrees given a lat/lng pairs', () => {
      const pointA = { lat: 39.099912, lng: -94.581213 }
      const pointB = { lat: 38.627089, lng: -90.200203 }
      const bearing = getBearing(pointA, pointB)
      expect(bearing).toBe(96.51262423499946)
    })
  })

  describe('getDistance', () => {
    it('returns distance in km given a lat/lng pairs', () => {
      const pointA = { lat: 39.099912, lng: -94.581213 }
      const pointB = { lat: 38.627089, lng: -90.200203 }
      const bearing = getDistance(pointA, pointB)
      expect(bearing).toBe(382.90005037560167)
    })
  })
})
