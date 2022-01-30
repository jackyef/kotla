import { Highlight } from '@/components/Guesses/Highlight'
import { render } from '@testing-library/react'

const createMockCity = (name: string) => {
  return {
    name,
    lat: 0,
    lng: 0,
    type: 'kota' as const,
    province: ''
  }
}

describe('components/Guesses/Highlight', () => {
  it('renders a letter in black if it does not appear in the cityOfTheDay', () => {
    const guess = createMockCity('abc')
    const cityOfTheDay = createMockCity('def')

    const { getByText } = render(
      <Highlight city={guess} cityOfTheDay={cityOfTheDay} />
    )

    expect(getByText('a')).toHaveClass('text-black')
    expect(getByText('b')).toHaveClass('text-black')
    expect(getByText('c')).toHaveClass('text-black')
  })

  it('renders a letter in yellow if it appears in the wrong index compared to the cityOfTheDay', () => {
    const guess = createMockCity('abc')
    const cityOfTheDay = createMockCity('dea')

    const { getByText } = render(
      <Highlight city={guess} cityOfTheDay={cityOfTheDay} />
    )

    expect(getByText('a')).toHaveClass('text-yellow-500')
    expect(getByText('b')).toHaveClass('text-black')
    expect(getByText('c')).toHaveClass('text-black')
  })

  it('renders a letter in green if it appears in the correct index compared to the cityOfTheDay', () => {
    const guess = createMockCity('abc')
    const cityOfTheDay = createMockCity('ade')

    const { getByText } = render(
      <Highlight city={guess} cityOfTheDay={cityOfTheDay} />
    )

    expect(getByText('a')).toHaveClass('text-green-700')
    expect(getByText('b')).toHaveClass('text-black')
    expect(getByText('c')).toHaveClass('text-black')
  })

  it('renders a letter in black if it appears more compared to the occurences in the cityOfTheDay', () => {
    const guess = createMockCity('aba')
    const cityOfTheDay = createMockCity('ade')

    const { getByText, getAllByText } = render(
      <Highlight city={guess} cityOfTheDay={cityOfTheDay} />
    )

    const allA = getAllByText('a')

    expect(allA[0]).toHaveClass('text-green-700')
    expect(getByText('b')).toHaveClass('text-black')
    expect(allA[1]).toHaveClass('text-black')
  })
})
