import clsx from 'clsx'
import { forwardRef, InputHTMLAttributes } from 'react'
import { useFocusableClass } from './hooks'

type Props = InputHTMLAttributes<HTMLInputElement>

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ className, ...props }, ref) => {
    const focusableClass = useFocusableClass()

    return (
      <input
        ref={ref}
        className={clsx(
          focusableClass,
          'py-2',
          'px-4',
          'bg-slate-100',
          className
        )}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'
