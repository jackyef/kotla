import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { FC, Fragment } from 'react'
import { X } from 'react-feather'
import { IconButton } from '../inputs/IconButton'

type Props = {
  isOpen?: boolean
  title: string
  onClose: () => void
}

export const Modal: FC<Props> = ({ isOpen, onClose, children, title }) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay
                className={clsx(
                  'fixed',
                  'inset-0',
                  'bg-black',
                  'bg-opacity-80'
                )}
              />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-lg">
                <div
                  className={clsx(
                    'flex',
                    'justify-between',
                    'items-center',
                    'mb-4'
                  )}
                >
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <IconButton aria-label="Tutup dialog" onClick={onClose}>
                    <X />
                  </IconButton>
                </div>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
