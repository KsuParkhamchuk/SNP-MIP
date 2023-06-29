import { RoundedButton } from '../../shared/roundedButton'
import { Search } from '../../shared/search/search'
import { useAddNewClientMutation } from '../../redux/features/apiSlice'
import { faker } from '@faker-js/faker'
import styles from './header.module.scss'

interface HeaderProps {
  onSearchClick: (searchQuery: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onSearchClick }) => {
  const [addNewClient] = useAddNewClientMutation()

  const handleAddNewClient = async (): Promise<void> => {
    try {
      await addNewClient({ id: faker.string.uuid(), name: faker.person.firstName() }).unwrap()
    } catch (err) {
      console.error('Failed to add the client: ', err)
    }
  }

  return (
    <div className={styles.header}>
      <RoundedButton btnText='Add new client' onClick={handleAddNewClient}/>
      <Search onSearchClick={onSearchClick}/>
    </div>
  )
}
