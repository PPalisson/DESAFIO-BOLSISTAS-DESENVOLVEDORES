import React from 'react'
import ReactDOM from 'react-dom/client'  // Mude de 'react-dom' para 'react-dom/client'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'));  // Criação da raiz

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)