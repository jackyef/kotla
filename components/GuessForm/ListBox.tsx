import { FC } from 'react'
import { Listbox as _Listbox } from '@headlessui/react'
import clsx from 'clsx'

interface HighlighterProps {
  value: string
  query: string
}

const Highlighter = ({ value, query }: HighlighterProps) => {
  const words = query.split(' ').join('|')

  const __html = value.replace(
    new RegExp(`(${words})`, 'gi'),
    '<span class="font-bold">$1</span>'
  )

  return <span dangerouslySetInnerHTML={{ __html }} />
}

const Container: FC = ({ children }) => {
  return (
    <div
      role="listbox"
      className={clsx(
        'absolute',
        'flex',
        'flex-col-reverse',
        'rounded-lg',
        'shadow-md',
        'shadow-slate-200',
        'bg-white',
        'w-full',
        'bottom-14',
        'overflow-y-auto'
      )}
      style={{
        maxHeight: '30vh'
      }}
    >
      {children}
    </div>
  )
}

type ItemProps = {
  value: string
  onClick: (value: string) => void
  query: string
  label?: string
}

const Item = ({ onClick, value, query, label }: ItemProps) => {
  const [shownValue] = value.split('__')

  return (
    <button
      role="listitem"
      type="button"
      onClick={() => {
        onClick(value)
      }}
      className={clsx(
        'p-3',
        'tracking-wide',
        'text-left',
        'outline-none',
        'focus:outline-none',
        'focus-visible:ring-teal-500',
        'focus:bg-teal-100',
        'focus:text-teal-800',
        'hover:bg-teal-100',
        'hover:text-teal-800',
        'inline-flex',
        'items-center'
      )}
    >
      <Highlighter value={shownValue} query={query} />
      {label && (
        <span className={clsx('ml-1', 'text-gray-500', 'text-sm')}>
          {label}
        </span>
      )}
    </button>
  )
}

export const ListBox = { Container, Item }
