import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Client } from '../../types'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:3000' } as FetchBaseQueryArgs),
  tagTypes: ['Client'],
  endpoints: (builder) => ({
    addNewClient: builder.mutation<Client, Client>({
      query: clientData => ({
        url: 'clients',
        method: 'POST',
        body: clientData
      }),
      invalidatesTags: ['Client']
    }),
    getClients: builder.query<Client[], void>({
      query: () => 'clients',
      providesTags: ['Client']
    }),
    deleteClient: builder.mutation({
      query: (id: string) => ({
        url: `clients/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Client']
    }),
    editClient: builder.mutation({
      query: (client: Client) => ({
        url: `clients/${client.id}`,
        method: 'PUT',
        body: client
      }),
      invalidatesTags: ['Client']
    }),
    addReport: builder.mutation<Client, { id: string, report: Report }>({
      query: ({ id, report }) => ({
        url: `clients/${id}/reports`,
        method: 'POST',
        body: report
      })
    })
  })
})

export const { useGetClientsQuery, useAddNewClientMutation, useDeleteClientMutation, useEditClientMutation } = clientsApi
