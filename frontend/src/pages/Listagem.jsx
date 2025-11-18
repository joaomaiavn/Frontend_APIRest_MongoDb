import React, { useState, useEffect } from 'react';
import { getAllPersons, deletePerson } from '../api';

function Listagem() {
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchPersons = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPersons();
      setPersons(data);
    } catch (err) {
      setError('Erro ao carregar a lista de pessoas. Verifique se o servidor está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Tem certeza que deseja deletar ${name}?`)) {
      return;
    }

    try {
      setMessage(null);
      setError(null);
      const result = await deletePerson(id);
      setMessage(result.message || 'Pessoa removida com sucesso!');
      // Recarregar lista
      await fetchPersons();
    } catch (err) {
      setError(err.message || 'Erro ao deletar pessoa.');
    }
  };

  if (loading) {
    return (
      <div className="container">
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando lista de pessoas...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h2 className="mb-4">Lista de Pessoas Cadastradas</h2>
          
          {message && (
            <div className="alert alert-success alert-dismissible fade show" role="alert">
              {message}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setMessage(null)}
                aria-label="Close"
              ></button>
            </div>
          )}
          
          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              {error}
              <button 
                type="button" 
                className="btn-close" 
                onClick={() => setError(null)}
                aria-label="Close"
              ></button>
            </div>
          )}

          {persons.length === 0 ? (
            <div className="alert alert-info" role="alert">
              Nenhuma pessoa cadastrada ainda. Use a página de Cadastro para adicionar pessoas.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead className="table-dark">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Salário</th>
                    <th scope="col">Aprovado</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {persons.map((person) => (
                    <tr key={person._id}>
                      <td>{person.name}</td>
                      <td>
                        {person.salary 
                          ? new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(person.salary)
                          : 'R$ 0,00'
                        }
                      </td>
                      <td>
                        {person.approved ? (
                          <span className="badge bg-success">Sim</span>
                        ) : (
                          <span className="badge bg-secondary">Não</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(person._id, person.name)}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <div className="mt-3">
            <button className="btn btn-secondary" onClick={fetchPersons}>
              Recarregar Lista
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listagem;
