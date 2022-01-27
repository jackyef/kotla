import _cities from './cities.json'

export type City = {
  name: string,
  lat: string,
  lng: string,
  province: string
}

export const cities = _cities as City[]
