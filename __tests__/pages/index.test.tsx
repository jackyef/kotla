import {
  DEFAULT_ALL_TIME_STATS,
  DEFAULT_GAME_STATE
} from '@/contexts/Kotla/constants'
import {
  ALL_TIME_STATS_KEY,
  GAME_STATE_KEY,
  NOTD_KEY
} from '@/contexts/Kotla/constants'
import { getTodayDateString } from '@/contexts/Kotla/helpers'

const mockCities = [
  {
    name: 'Madiun',
    lat: -7.63333,
    lng: 111.53333,
    province: 'Jawa Timur',
    type: 'kota' as const
  },
  {
    name: 'Madiun',
    lat: -7.61667,
    lng: 111.65,
    province: 'Jawa Timur',
    type: 'kabupaten' as const
  },
  {
    name: 'Bandung',
    lat: -6.9175,
    lng: 107.62444,
    province: 'Jawa Barat',
    type: 'kota' as const
  },
  {
    name: 'Bandung',
    lat: -7.1,
    lng: 107.6,
    province: 'Jawa Barat',
    type: 'kabupaten' as const
  },
  {
    name: 'Bima',
    lat: -8.6,
    lng: 118.61667,
    province: 'Nusa Tenggara Barat',
    type: 'kabupaten' as const
  },
  {
    name: 'Medan',
    lat: 3.65,
    lng: 98.66667,
    province: 'Sumatera Utara',
    type: 'kota' as const
  }
]

jest.mock('@/utils/dataSources/cities', () => {
  return {
    cities: mockCities
  }
})

jest.mock('localforage', () => {
  return {
    setItem: () => {},
    getItem: (key: string) => {
      if (key === NOTD_KEY) {
        return { number: 0, dateString: getTodayDateString() }
      }

      if (key === GAME_STATE_KEY) {
        return DEFAULT_GAME_STATE
      }

      if (key === ALL_TIME_STATS_KEY) {
        return DEFAULT_ALL_TIME_STATS
      }
    }
  }
})

const mockToast = {
  success: jest.fn(),
  error: jest.fn()
}

jest.mock('@/lib/toast', () => {
  return { toast: mockToast }
})

import { fireEvent, waitFor } from '@testing-library/react'

describe('pages/index', () => {
  const { renderWithProviders } = require('@/utils/tests/renderWithProviders')

  beforeEach(() => {
    // Clear the counter of all mocks, but keep implementation
    jest.clearAllMocks()
  })

  describe('guessing mechanics', () => {
    const HomePage = require('@/pages/index').default

    describe('when the guess.name does not match anything in the list', () => {
      it('shows a toast error message', async () => {
        const { getByPlaceholderText, getByText } = renderWithProviders(
          <HomePage />
        )

        const guessInput = getByPlaceholderText('Tebak di sini')
        const guessButton = getByText('Tebak')

        expect(true).toBe(true)
        await waitFor(() => {
          expect(guessButton).not.toBeDisabled()
        })

        fireEvent.change(guessInput, { target: { value: 'Ngaco' } })
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(
            'Kota tidak ada dalam daftar Kotla'
          )
        })
      })
    })

    describe('when the guess.name matches 2 cities in the list', () => {
      it('shows a toast error when user just types and submits their guess', async () => {
        const { getByPlaceholderText, getByText } = renderWithProviders(
          <HomePage />
        )

        const guessInput = getByPlaceholderText('Tebak di sini')
        const guessButton = getByText('Tebak')

        expect(true).toBe(true)
        await waitFor(() => {
          expect(guessButton).not.toBeDisabled()
        })

        fireEvent.change(guessInput, { target: { value: 'madiun' } })
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(
            'Silahkan pilih opsi yang spesifik antara kabupaten atau kota "madiun"'
          )
        })
      })
      it('submits a guess based on the clicked option', async () => {
        const { getByPlaceholderText, getByText, getByLabelText } =
          renderWithProviders(<HomePage />)

        const guessInput = getByPlaceholderText('Tebak di sini')
        const guessButton = getByText('Tebak')

        expect(true).toBe(true)
        await waitFor(() => {
          expect(guessButton).not.toBeDisabled()
        })

        fireEvent.change(guessInput, { target: { value: 'madiun' } })
        fireEvent.click(getByText('(kabupaten)'))
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(getByLabelText('Madiun')).toBeInTheDocument()
        })
      })
    })

    describe('when the guess.name only matches 1 city', () => {
      it('submits it as a guess if it exists in the list', async () => {
        const { getByPlaceholderText, getByText, getByLabelText } =
          renderWithProviders(<HomePage />)

        const guessInput = getByPlaceholderText('Tebak di sini')
        const guessButton = getByText('Tebak')

        expect(true).toBe(true)
        await waitFor(() => {
          expect(guessButton).not.toBeDisabled()
        })

        fireEvent.change(guessInput, { target: { value: 'bima' } })
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(getByLabelText('Bima')).toBeInTheDocument()
        })
      })

      it('shows a toast error if it does not exist in the list', async () => {
        const { getByPlaceholderText, getByText, getByLabelText } =
          renderWithProviders(<HomePage />)

        const guessInput = getByPlaceholderText('Tebak di sini')
        const guessButton = getByText('Tebak')

        expect(true).toBe(true)
        await waitFor(() => {
          expect(guessButton).not.toBeDisabled()
        })

        fireEvent.change(guessInput, { target: { value: 'ngaco' } })
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(
            'Kota tidak ada dalam daftar Kotla'
          )
        })
      })
    })

    describe('when the guess matches a previous guess', () => {
      it('shows a toast error message', async () => {
        const { getByPlaceholderText, getByText, getByLabelText } =
          renderWithProviders(<HomePage />)

        const guessInput = getByPlaceholderText('Tebak di sini')
        const guessButton = getByText('Tebak')

        expect(true).toBe(true)
        await waitFor(() => {
          expect(guessButton).not.toBeDisabled()
        })

        fireEvent.change(guessInput, { target: { value: 'medan' } })
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(getByLabelText('Medan')).toBeInTheDocument()
        })

        fireEvent.change(guessInput, { target: { value: 'medan' } })
        fireEvent.click(guessButton)

        await waitFor(() => {
          expect(mockToast.error).toHaveBeenCalledWith(
            'Kota sudah ditebak sebelumnya'
          )
        })
      })
    })
  })
})
