import { configureStore } from '@reduxjs/toolkit'
import { clientsApi } from './redux/features/apiSlice'

export const store = configureStore({
  reducer: {
    [clientsApi.reducerPath]: clientsApi.reducer
  }
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
