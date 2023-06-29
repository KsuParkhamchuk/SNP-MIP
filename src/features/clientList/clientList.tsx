import { Client } from '../../types'
import { ClientInfo } from '../../entities/clientInfo'

interface ClientListProps {
  clients: Client[]
}

export const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    clients.map((client) => <ClientInfo key={client.id} client={client}/>)
  )
}
