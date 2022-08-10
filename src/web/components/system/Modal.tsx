import Heading from "@/web/components/system/Heading"
import Icon from "@/web/components/system/Icon"
import { UIProps } from "@/web/typed"
import { Dialog, Transition } from "@headlessui/react"
import {
  FC,
  Fragment,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from "react"

export const useModal = (
  initialState = false,
): [boolean, () => void, () => void, () => void] => {
  const [isOpen, setIsOpen] = useState(initialState)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((isOpen: boolean) => !isOpen), [])

  return [isOpen, open, close, toggle]
}
export type ModalProps = UIProps<{
  open: boolean
  title: ReactNode
  mandatory?: boolean
  onClose: () => void
}>

// We use this to let the first focusable element be something else than the close button in the modal
// This is a cheaper alternative to https://headlessui.dev/react/dialog#managing-initial-focus
const TimedButton: FC<UIProps<unknown, "button">> = (props) => {
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const timerId = setTimeout(() => setShouldRender(true), 50)

    return () => clearTimeout(timerId)
  }, [])

  return shouldRender ? <button {...props} /> : null
}

const Modal: FC<ModalProps> = (props) => {
  const { open, title, onClose, children, mandatory = false } = props

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/30" />
        </Transition.Child>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="fixed inset-0 mx-auto max-h-full max-w-2xl overflow-y-auto sm:inset-x-0 sm:inset-y-10 sm:left-10 sm:right-10 sm:rounded-2xl md:left-20 md:right-20">
            <div className="flex min-h-fit flex-col justify-start bg-white px-10 pt-9 pb-10 sm:h-auto sm:rounded-2xl">
              <Dialog.Panel>
                <Dialog.Title
                  as={Heading}
                  size="md"
                  level={1}
                  className="flex items-center"
                >
                  {title}
                  {mandatory ? null : (
                    <TimedButton
                      onClick={onClose}
                      className="ml-auto inline-block px-4 py-2"
                    >
                      <Icon name="XIcon" />
                    </TimedButton>
                  )}
                </Dialog.Title>
                <Dialog.Description as="div">{children}</Dialog.Description>
              </Dialog.Panel>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  )
}

export default Modal
