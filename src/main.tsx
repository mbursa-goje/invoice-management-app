import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { InvoiceProvider } from './context/InvoiceContext'
import { ThemeProvider } from './context/ThemeContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <InvoiceProvider>
        <App />
      </InvoiceProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
