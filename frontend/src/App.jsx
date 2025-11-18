/*
=============================================================
📱 Aplicativo: Minha Agenda de Contatos
🎯 Tema: Gerenciamento de contatos pessoais com React e localStorage

👥 Integrantes do grupo:
- João Maia (joaomaiavn02@gmail.com) — Desenvolvimento do front-end, rotas e componentes visuais.
- [Nome do colega] ([email]) — Implementação de formulários, validação e persistência de dados.

🧩 Funções executadas:
- Criação da estrutura React com Vite
- Desenvolvimento das páginas (Home, Cadastro e Listagem)
- Implementação do hook customizado useLocalStorage
- Estilização com Bootstrap e CSS customizado
- Navegação entre páginas com React Router
=============================================================
*/

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
