import React from 'react';

function Home() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title text-center mb-4">Bem-vindo ao Sistema de Cadastro de Pessoas</h1>
              <p className="card-text text-center">
                Este é um sistema completo de CRUD (Create, Read, Update, Delete) desenvolvido com:
              </p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item"><strong>Backend:</strong> Node.js + Express + MongoDB</li>
                <li className="list-group-item"><strong>Frontend:</strong> React + Vite + Bootstrap</li>
                <li className="list-group-item"><strong>API RESTful:</strong> Endpoints para gerenciar pessoas</li>
              </ul>
              <div className="text-center">
                <h5>Funcionalidades</h5>
                <p>
                  Use o menu acima para navegar entre as páginas:
                </p>
                <ul className="list-unstyled">
                  <li>📝 <strong>Cadastro:</strong> Adicione novas pessoas ao sistema</li>
                  <li>📋 <strong>Listagem:</strong> Visualize e gerencie todas as pessoas cadastradas</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
