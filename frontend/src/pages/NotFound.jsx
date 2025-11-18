import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="text-center">
      {/* Mensagem simples para rotas inexistentes */}
      <h1 className="display-5 text-danger mb-3">Página não encontrada</h1>
      <p className="lead mb-4">A rota que você tentou acessar não existe.</p>
      <Link className="btn btn-primary me-2" to="/">Ir para Home</Link>
      <Link className="btn btn-outline-secondary" to="/listagem">Ir para Listagem</Link>
    </div>
  )
}
