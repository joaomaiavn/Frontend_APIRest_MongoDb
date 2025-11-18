import React from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Listagem from './pages/Listagem'
import NotFound from './pages/NotFound'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import './index.css'

// Definição das rotas do SPA.
// App funciona como layout (Header + <Outlet />) e as páginas abaixo são filhas.
const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: 'cadastro', element: <Cadastro /> },
        { path: 'cadastro/:id', element: <Cadastro /> },
        { path: 'listagem', element: <Listagem /> },
        // Fallback 404 para qualquer rota não mapeada
        { path: '*', element: <NotFound /> },
      ],
    },
  ],
  {
    // Ativa comportamentos futuros do React Router v7 para transições e caminhos relativos
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
)

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
