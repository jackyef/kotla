import _toast from 'react-hot-toast'
import colors from 'tailwindcss/colors'

export const toastOptions = {
  duration: 3000,
  style: {
    background: colors.cyan['50'],
    color: colors.cyan['800']
  },
  success: {
    style: {
      background: colors.teal['50'],
      color: colors.teal['800']
    }
  },
  error: {
    style: {
      background: colors.red['50'],
      color: colors.red['800']
    }
  }
}

const info = (text: string) => _toast(text)
const success = (text: string) => _toast.success(text)
const error = (text: string) => _toast.error(text)

export const toast = {
  info,
  success,
  error
}
