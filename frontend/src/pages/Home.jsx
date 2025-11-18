import React from 'react'

// Página inicial com atalhos para cadastro e listagem
const Home = () => (
  <div>
    <h1 className="display-4 text-primary mb-4">Bem-vindo à Agenda de Contatos!</h1>
    <p className="lead">
      Gerencie sua lista de contatos facilmente. Cadastre nomes, e-mails e telefones, e acesse-os a qualquer momento.
      Os dados são salvos localmente no seu navegador.
    </p>
    <div className="row mt-4">
      <div className="col-md-6">
        <div className="card border-primary h-100">
          <div className="card-body">
            <h5 className="card-title">Adicionar Contato</h5>
            <p className="card-text">Registre um novo contato com detalhes básicos.</p>
            {/* Poderia ser um <Link> para navegação SPA, mas <a> funciona em produção também */}
            <a href="/cadastro" className="btn btn-primary">Ir para Cadastro</a>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <div className="card border-success h-100">
          <div className="card-body">
            <h5 className="card-title">Ver Contatos</h5>
            <p className="card-text">Confira todos os contatos cadastrados.</p>
            <a href="/listagem" className="btn btn-success">Ir para Listagem</a>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default Home
