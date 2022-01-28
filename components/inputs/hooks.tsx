import clsx from 'clsx'

export const useFocusableClass = () => {
  return clsx(
    'rounded-md',
    'outline-none',
    'focus:outline-none',
    'focus-visible:ring-2',
    'focus-visible:ring-offset-1',
    'focus-visible:ring-teal-500'
  )
}
