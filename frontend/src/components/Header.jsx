import React from 'react'
import { Link, useLocation } from 'react-router-dom'

// Navbar simples com destaque para a rota ativa
const Header = () => {
  const location = useLocation()

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="bi bi-person-lines-fill me-2"></i> {/* Ícone de agenda */}
          Agenda de Contatos
        </Link>
        <div className="navbar-nav ms-auto">
          <Link 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`} 
            to="/"
          >
            <i className="bi bi-house-door me-1"></i>Home
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/cadastro' ? 'active' : ''}`} 
            to="/cadastro"
          >
            <i className="bi bi-plus-circle me-1"></i>Novo Contato
          </Link>
          <Link 
            className={`nav-link ${location.pathname === '/listagem' ? 'active' : ''}`} 
            to="/listagem"
          >
            <i className="bi bi-list-ul me-1"></i>Lista
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Header
