import { Point } from './types'

// Converts from degrees to radians.
const toRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180
}

// Converts from radians to degrees.
const toDegrees = (radians: number) => {
  return (radians * 180) / Math.PI
}

export const getBearing = (pointA: Point, pointB: Point) => {
  let { lat: lat1, lng: lng1 } = pointA
  let { lat: lat2, lng: lng2 } = pointB

  lat1 = toRadians(lat1)
  lng1 = toRadians(lng1)
  lat2 = toRadians(lat2)
  lng2 = toRadians(lng2)

  const y = Math.sin(lng2 - lng1) * Math.cos(lat2)
  const x =
    Math.cos(lat1) * Math.sin(lat2) -
    Math.sin(lat1) * Math.cos(lat2) * Math.cos(lng2 - lng1)

  const bearing = toDegrees(Math.atan2(y, x))

  return (bearing + 360) % 360
}

export const getDistance = (pointA: Point, pointB: Point) => {
  const { lat: lat1, lng: lng1 } = pointA
  const { lat: lat2, lng: lng2 } = pointB

  const earthRadius = 6371 // km

  const dLat = toRadians(lat2 - lat1)
  const dLng = toRadians(lng2 - lng1)

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) *
      Math.cos(toRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = earthRadius * c

  return d
}

// Distance between Sabang and Merauke
export const MAX_DISTANCE_KM = 5245

export const getBearingDirection = (bearingDegree: number) => {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const
  const emoji = {
    N: '⬆️',
    NE: '↗️',
    E: '➡️',
    SE: '↘️',
    S: '⬇️',
    SW: '↙️',
    W: '⬅️',
    NW: '↖️'
  } as const
  const label = {
    N: 'Utara',
    NE: 'Timur Laut',
    E: 'Timur',
    SE: 'Tenggara',
    S: 'Selatan',
    SW: 'Barat Daya',
    W: 'Barat',
    NW: 'Barat Laut'
  } as const

  const index = [
    bearingDegree > 337.5 || bearingDegree < 22.5,
    bearingDegree > 22.5 && bearingDegree < 67.5,
    bearingDegree > 67.5 && bearingDegree < 112.5,
    bearingDegree > 112.5 && bearingDegree < 157.5,
    bearingDegree > 157.5 && bearingDegree < 202.5,
    bearingDegree > 202.5 && bearingDegree < 247.5,
    bearingDegree > 247.5 && bearingDegree < 292.5,
    bearingDegree > 292.5 && bearingDegree < 337.5
  ].findIndex(Boolean)

  return {
    emoji: emoji[directions[index]],
    label: label[directions[index]]
  }
}
