import { XMarkIcon } from '@heroicons/react/24/solid'
import styles from './closeIconButton.module.scss'

interface CloseIconButtonProps {
  onClick: () => void
}

export const CloseIconButton: React.FC<CloseIconButtonProps> = ({ onClick }) => {
  return (
    <button onClick={onClick}><XMarkIcon className={styles.icon}/></button>
  )
}
