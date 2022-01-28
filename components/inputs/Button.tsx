import clsx from 'clsx'
import { FC, ButtonHTMLAttributes } from 'react'
import { useFocusableClass } from './hooks'

export const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const focusableClass = useFocusableClass()

  return (
    <button
      className={clsx(
        focusableClass,
        'py-2',
        'px-4',
        'text-teal-800',
        'bg-teal-100',
        'hover:bg-teal-200',
        'font-medium',
        'disabled:cursor-not-allowed',
        'disabled:bg-slate-400',
        className
      )}
      {...props}
    />
  )
}
