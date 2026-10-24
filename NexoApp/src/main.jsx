import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './activos/estilos/principal.css'
import './activos/estilos/cuenta.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
