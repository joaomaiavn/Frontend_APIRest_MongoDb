import { useState, useEffect } from 'react'
import { apiGetPeople } from '../api'

function Listagem() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchPeople()
  }, [])

  const fetchPeople = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const data = await apiGetPeople()
      setPeople(data)
    } catch (err) {
      setError(err.message || 'Erro ao carregar pessoas')
    } finally {
      setLoading(false)
    }
  }

  const handleRefresh = () => {
    fetchPeople()
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <div className="card shadow">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h2 className="card-title mb-0">Listagem de Pessoas</h2>
              <button
                className="btn btn-light btn-sm"
                onClick={handleRefresh}
                disabled={loading}
              >
                <i className="bi bi-arrow-clockwise"></i> Atualizar
              </button>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Carregando...</span>
                  </div>
                  <p className="mt-2 text-muted">Carregando dados...</p>
                </div>
              ) : people.length === 0 ? (
                <div className="alert alert-info" role="alert">
                  Nenhuma pessoa cadastrada ainda. Vá para a página de cadastro para adicionar.
                </div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-striped table-hover">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Nome</th>
                        <th scope="col">Salário</th>
                        <th scope="col">Aprovado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {people.map((person, index) => (
                        <tr key={person._id || index}>
                          <th scope="row">{index + 1}</th>
                          <td>{person.name}</td>
                          <td>
                            {person.salary
                              ? person.salary.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })
                              : 'R$ 0,00'}
                          </td>
                          <td>
                            {person.approved ? (
                              <span className="badge bg-success">Sim</span>
                            ) : (
                              <span className="badge bg-secondary">Não</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {!loading && people.length > 0 && (
                <div className="mt-3">
                  <p className="text-muted small mb-0">
                    Total de pessoas cadastradas: <strong>{people.length}</strong>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Listagem
