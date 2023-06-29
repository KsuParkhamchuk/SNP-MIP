import { Header } from '../features/header'
import { ClientList } from '../features/clientList'
import { useGetClientsQuery } from '../redux/features/apiSlice'
import { useEffect, useState } from 'react'
import { Client } from '../types'
import { toast } from 'react-toastify'

export const Clients: React.FC = () => {
  const { data: clients, isError, isLoading } = useGetClientsQuery()
  const [searchResultClients, setSearchResultClients] = useState<Client[] | undefined>([])

  const handleSearchClick = (searchQuery: string): void => {
    const filtered = clients?.filter((client) =>
      client?.name.toLowerCase().includes(searchQuery)
    )
    setSearchResultClients(filtered)
  }

  useEffect(() => {
    setSearchResultClients(clients)
  }, [clients])

  return (
    <div className='max-w-xl mx-auto mt-16'>
      <Header onSearchClick={handleSearchClick}/>
      {isLoading && <div>Loading...</div>}
      {isError && toast.error('Error while loading clients', { position: toast.POSITION.BOTTOM_RIGHT })}
      {searchResultClients ? <ClientList clients={searchResultClients}/> : 'No clients added yet'}
    </div>
  )
}
