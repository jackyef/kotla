import clsx from 'clsx'
import { ButtonHTMLAttributes, FC } from 'react'

export const HeaderButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  className,
  ...props
}) => {
  return (
    <button
      aria-label="Bantuan"
      className={clsx(
        'justify-start',
        'text-sm',
        'decoration-cyan-600',
        'underline',
        'underline-offset-1',
        'decoration-dotted',
        'text-slate-500',
        className
      )}
      {...props}
    />
  )
}
