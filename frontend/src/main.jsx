// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AuthProvider } from './AuthContext.jsx'; // Importe o AuthProvider
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Envolvemos a aplicação inteira com o nosso provedor de autenticação */}
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
)