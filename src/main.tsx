import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'


//React injects the entire application into the index.html
//! is a TypeScript "non-null assertion". It tells the TypeScript that an ID of root exists in the HTML, so it should not throw an error thinking it might be null
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
