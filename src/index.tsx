import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { store } from './store'
import { Provider } from 'react-redux'
import { Clients } from './widgets'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { clientsApi } from './redux/features/apiSlice'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApiProvider api={clientsApi}>
        <Clients/>
      </ApiProvider>
    </Provider>
  </React.StrictMode>
)
