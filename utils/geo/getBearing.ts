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
