import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './routes/app'
import { BrowserRouter } from 'react-router-dom'

const container = document.getElementById('root')

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOM.createRoot(container!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
