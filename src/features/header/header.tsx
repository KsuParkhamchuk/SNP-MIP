import { RoundedButton } from '../../shared/roundedButton'
import { Search } from '../../shared/search/search'
import { useAddNewClientMutation } from '../../redux/features/apiSlice'
import { faker } from '@faker-js/faker'

export const Header: React.FC = () => {
  const [addNewClient] = useAddNewClientMutation()

  const handleSearchClick = (): void => {

  }

  const handleAddNewClient = async (): Promise<void> => {
    try {
      await addNewClient({ id: faker.string.uuid(), name: faker.person.firstName() }).unwrap()
    } catch (err) {
      console.error('Failed to save the post: ', err)
    }
  }

  return (
    <div className='flex justify-between'>
      <RoundedButton btnText='Add new client' onClick={handleAddNewClient}/>
      <Search onClick={handleSearchClick}/>
    </div>
  )
}
