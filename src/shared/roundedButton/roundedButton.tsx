import styles from './roundedButton.module.scss'

interface RoundedButtonProps {
  btnText: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>, id?: string) => any
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({ btnText, onClick }) => {
  return (
    <button type="button" className={styles.button} onClick={onClick}>
      {btnText}
    </button>
  )
}
