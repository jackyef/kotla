import clsx from 'clsx'

export const useFocusableClass = () => {
  return clsx(
    'rounded-md',
    'outline-none',
    'border-solid',
    'border-4',
    'border-transparent',
    'focus:border-teal-500',
  )
}
