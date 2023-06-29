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
  children?: ReactElement[] | ReactElement
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
            <Disclosure.Button className={styles.accordion__headerButton}>
              <div className={styles.mFlexCenter}>
                <span className={styles.mFlexCenter}>
                  {open
                    ? (
                    <ChevronUpIcon className={styles.accordion__headerIcon} aria-hidden="true"/>
                      )
                    : (
                    <ChevronDownIcon className={styles.accordion__headerIcon} aria-hidden="true"/>
                      )}
                </span>
                <span className={styles.accordion__headerText}>{header}</span>
              </div>
              <XMarkIcon onClick={onDeleteBtnClick} className={styles.accordion__headerIcon}/>
            </Disclosure.Button>
          </h3>
          <Disclosure.Panel className={styles.accordion__panel}>
            <div className={styles.accordion__panelContainer}>
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
