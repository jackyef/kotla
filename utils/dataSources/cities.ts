import _cities from './cities.json'

export type City = {
  name: string,
  lat: number,
  lng: number,
  province: string
}

export const cities = _cities as City[]
