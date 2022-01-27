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
      className={clsx(focusableClass, 'py-2', 'px-4', className)}
      {...props}
    />
  )
}
