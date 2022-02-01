import { getLetterBoxes } from '@/components/Layout/Statistics/ShareButtons'

const mockCities = [
  {
    name: 'Karo',
    lat: 3.11667,
    lng: 98.3,
    province: 'Sumatera Utara',
    type: 'kabupaten' as const
  },
  {
    name: 'Maluku Tenggara',
    lat: -5.75,
    lng: 132.73334,
    province: 'Maluku',
    type: 'kabupaten' as const
  },
  {
    name: 'Balangan',
    lat: -2.32314,
    lng: 115.62922,
    province: 'Kalimantan Selatan',
    type: 'kabupaten' as const
  }
]

describe('components/Layout/Statistics/ShareButtons', () => {
  describe('getLetterBoxes', () => {
    describe('when current guess is shorter than longest guess', () => {
      const longestGuess = mockCities[2]

      it('pads with ⬜ when current guess is not the correct answer', () => {
        const guess = mockCities[0]
        const answer = mockCities[1]
        const output = getLetterBoxes(guess, answer, longestGuess)

        expect(output).toBe('🟨🟩🟨⬜⬜⬜⬜⬜')
      })

      it('pads with 🟩 when current guess is the correct answer', () => {
        const guess = mockCities[0]
        const answer = mockCities[0]
        const output = getLetterBoxes(guess, answer, longestGuess)

        expect(output).toBe('🟩🟩🟩🟩🟩🟩🟩🟩')
      })

      describe('when longest guess has more than 10 letters', () => {
        const longestGuess = mockCities[1]

        it('pads with ⬜ when current guess is not the correct answer, up to 10 total', () => {
          const guess = mockCities[0]
          const answer = mockCities[1]
          const output = getLetterBoxes(guess, answer, longestGuess)

          expect(output).toBe('🟨🟩🟨⬜⬜⬜⬜⬜⬜⬜')
        })

        it('pads with 🟩 when current guess is the correct answer, up to 10 total', () => {
          const guess = mockCities[0]
          const answer = mockCities[0]
          const output = getLetterBoxes(guess, answer, longestGuess)

          expect(output).toBe('🟩🟩🟩🟩🟩🟩🟩🟩🟩🟩')
        })
      })
    })
  })
})
