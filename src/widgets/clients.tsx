import { Header } from '../features/header'
import { ClientList } from '../features/clientList'
import { useGetClientsQuery } from '../redux/features/apiSlice'

export const Clients: React.FC = () => {
  const { data, error, isLoading } = useGetClientsQuery()

  return (
    <div className='max-w-xl mx-auto mt-16'>
      <Header/>
      {isLoading && <div>Loading...</div>}
      {error && <div>Unexpected error</div>}
      {data && <ClientList clients={data}/>}
    </div>
  )
}
