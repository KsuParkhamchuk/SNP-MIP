import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Disclosure } from '@headlessui/react'
import { RoundedButton } from '../roundedButton'
import styles from './accordion.module.scss'
import { ReactElement } from 'react'

interface AccordionProps {
  header: string
  btnText: string
  innerText: string
  onBtnClick: (e: React.MouseEvent<HTMLButtonElement>, id?: string) => any
  onDeleteBtnClick: () => any
  children?: ReactElement[]
}

export const Accordion: React.FC<AccordionProps> = ({
  header,
  btnText,
  innerText,
  onBtnClick,
  onDeleteBtnClick,
  children
}) => {
  return (
    <Disclosure as="div" className={styles.accordion}>
      {({ open }) => (
        <>
          <h3 className={styles.accordion__header}>
            <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
              <div className="ml-6 flex items-center">
                <span className="ml-6 flex items-center">
                  {open
                    ? (
                    <ChevronUpIcon className={styles.accordion__headerIcon} aria-hidden="true" />
                      )
                    : (
                    <ChevronDownIcon className={styles.accordion__headerIcon} aria-hidden="true" />
                      )}
                </span>
                <span className={styles.accordion__headerText}>{header}</span>
              </div>
              <XMarkIcon onClick={onDeleteBtnClick} className="h-5 w-5" />
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className="pt-6">
            <div className="flex justify-between">
              <p>{innerText}</p>
              <RoundedButton btnText={btnText} onClick={onBtnClick} />
            </div>
            {children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
