import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="text-center mb-5">
            <h1 className="display-4 mb-3">Bem-vindo ao Sistema de Cadastro</h1>
            <p className="lead text-muted">
              Gerencie pessoas com facilidade usando nossa API REST
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-person-plus-fill fs-1 text-primary"></i>
                  </div>
                  <h5 className="card-title">Cadastrar Pessoa</h5>
                  <p className="card-text text-muted">
                    Adicione novas pessoas ao sistema com nome, salário e status de aprovação
                  </p>
                  <Link to="/cadastro" className="btn btn-primary">
                    Ir para Cadastro
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-list-ul fs-1 text-success"></i>
                  </div>
                  <h5 className="card-title">Listar Pessoas</h5>
                  <p className="card-text text-muted">
                    Visualize todas as pessoas cadastradas no sistema
                  </p>
                  <Link to="/listagem" className="btn btn-success">
                    Ir para Listagem
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title">Sobre o Sistema</h5>
                <p className="card-text">
                  Este é um sistema completo de CRUD (Create, Read, Update, Delete) desenvolvido com:
                </p>
                <ul className="list-unstyled">
                  <li><strong>Backend:</strong> Node.js + Express + MongoDB</li>
                  <li><strong>Frontend:</strong> React + Bootstrap + Vite</li>
                  <li><strong>API REST:</strong> Endpoints para gerenciamento de pessoas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
