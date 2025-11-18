
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'

function App() {
  return (
    <div className="min-vh-100 bg-light">
      {/* Cabeçalho fixo do app com navegação */}
      <Header />
      <div className="container my-4">
        {/* Área onde as rotas filhas são renderizadas */}
        <Outlet />
      </div>
    </div>
  )
}

export default App
