import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="display-4 fw-bold text-primary">Bem-vindo ao Sistema de Gerenciamento</h1>
            <p className="lead text-muted">
              Sistema de cadastro e listagem de pessoas utilizando React, Bootstrap e MongoDB
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-6">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-person-plus-fill text-primary" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h3 className="card-title h4">Cadastrar Pessoa</h3>
                  <p className="card-text text-muted">
                    Adicione novas pessoas ao sistema com informações de nome, salário e status de aprovação.
                  </p>
                  <Link to="/cadastro" className="btn btn-primary">
                    Ir para Cadastro
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="card h-100 shadow-sm hover-card">
                <div className="card-body text-center">
                  <div className="mb-3">
                    <i className="bi bi-list-ul text-success" style={{ fontSize: '3rem' }}></i>
                  </div>
                  <h3 className="card-title h4">Listar Pessoas</h3>
                  <p className="card-text text-muted">
                    Visualize todas as pessoas cadastradas no sistema em uma tabela organizada.
                  </p>
                  <Link to="/listagem" className="btn btn-success">
                    Ir para Listagem
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 p-4 bg-white rounded shadow-sm">
            <h4 className="mb-3">Sobre o Sistema</h4>
            <p className="mb-2">
              <strong>Backend:</strong> Express.js + MongoDB (Mongoose)
            </p>
            <p className="mb-2">
              <strong>Frontend:</strong> React 18 + Vite + Bootstrap 5
            </p>
            <p className="mb-0">
              <strong>API:</strong> RESTful API rodando em http://localhost:3000
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
