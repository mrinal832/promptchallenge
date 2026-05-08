import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store'
import App from './App.jsx'
import './index.css'

import { LoadScript } from '@react-google-maps/api';

const libraries = ['places'];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <LoadScript 
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY} 
          libraries={libraries}
        >
          <App />
        </LoadScript>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
