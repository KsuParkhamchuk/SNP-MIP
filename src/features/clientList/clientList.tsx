import { Client } from '../../types'
import { MemoizedClientInfo } from '../../entities/clientInfo'

interface ClientListProps {
  clients: Client[]
}

export const ClientList: React.FC<ClientListProps> = ({ clients }) => {
  return (
    clients.map((client) => <MemoizedClientInfo key={client.id} client={client}/>)
  )
}
