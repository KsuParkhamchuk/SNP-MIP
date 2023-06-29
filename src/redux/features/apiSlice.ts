import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Client, Report, ReportData } from '../../types'
import { FetchBaseQueryArgs } from '@reduxjs/toolkit/dist/query/fetchBaseQuery'

export const clientsApi = createApi({
  reducerPath: 'clientsApi',
  baseQuery: fetchBaseQuery({ baseUrl: ' http://localhost:3000' } as FetchBaseQueryArgs),
  tagTypes: ['Client', 'Report', 'ReportData'],
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
    getReports: builder.query<Report[], void>({
      query: () => 'reports',
      providesTags: ['Report']
    }),
    deleteReport: builder.mutation({
      query: (id: string) => ({
        url: `reports/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['Report']
    }),
    addReport: builder.mutation<Report, { id: string, report: Report }>({
      query: ({ id, report }) => ({
        url: `clients/${id}/reports`,
        method: 'POST',
        body: report
      }),
      invalidatesTags: ['Report']
    }),
    getReportData: builder.query<ReportData[], void>({
      query: () => 'reportsData',
      providesTags: ['ReportData']
    }),
    deleteReportData: builder.mutation({
      query: (id: string) => ({
        url: `reportsData/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: ['ReportData']
    }),
    addReportData: builder.mutation<ReportData, { id: string, reportData: ReportData }>({
      query: ({ id, reportData }) => ({
        url: `reports/${id}/reportsData`,
        method: 'POST',
        body: reportData
      }),
      invalidatesTags: ['ReportData']
    })
  })
})

export const {
  useGetClientsQuery,
  useAddNewClientMutation,
  useDeleteClientMutation,
  useEditClientMutation,
  useAddReportMutation,
  useGetReportsQuery,
  useDeleteReportMutation,
  useGetReportDataQuery,
  useAddReportDataMutation,
  useDeleteReportDataMutation
} = clientsApi
