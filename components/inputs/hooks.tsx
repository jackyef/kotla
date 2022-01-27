import clsx from 'clsx'

export const useFocusableClass = () => {
  return clsx(
    'rounded-md',
    'outline-none',
    'border-solid',
    'border-2',
    'border-transparent',
    'focus:border-teal-500',
  )
}
