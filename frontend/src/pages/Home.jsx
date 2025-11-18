import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="row">
      <div className="col-md-8 mx-auto">
        <div className="card shadow-sm">
          <div className="card-body">
            <h1 className="card-title">Bem-vindo</h1>
            <p className="card-text">
              Este frontend em React consome a API REST em /person. Use o menu para navegar entre as páginas.
            </p>
            <hr />
            <Link to="/cadastro" className="btn btn-primary me-2">Cadastro</Link>
            <Link to="/listagem" className="btn btn-outline-primary">Listagem</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
