import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'
import { useFocusableClass } from './hooks'

export const IconButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  const focusableClass = useFocusableClass()

  return (
    <button
      className={clsx(
        'justify-start',
        'text-sm',
        'decoration-cyan-600',
        'underline',
        'underline-offset-1',
        'decoration-dotted',
        'text-slate-500',
        focusableClass,
        className
      )}
      {...props}
    />
  )
}
