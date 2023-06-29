import { createSlice } from '@reduxjs/toolkit'
import { Client } from '../../../types'

export interface ClientsState {
  clients: Client[]
}

const initialState: ClientsState = {
  clients: []
}

export const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    addClient: (state: ClientsState, action) => {
      state.clients.push(action.payload)
    },
    deleteClient: (state, action) => {
      // return state.clients.filter(client => client.id !== action.payload)
    }
  }
})

export const { addClient, deleteClient } = clientsSlice.actions

export default clientsSlice.reducer
