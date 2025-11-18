import { useState, useEffect } from 'react'
import { apiGetPeople, apiDeletePerson } from '../api'
import { Link } from 'react-router-dom'

function Listagem() {
  const [people, setPeople] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [deleteLoading, setDeleteLoading] = useState(null)

  const fetchPeople = async () => {
    try {
      setLoading(true)
      setError('')
      const data = await apiGetPeople()
      setPeople(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPeople()
  }, [])

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja deletar esta pessoa?')) {
      return
    }

    try {
      setDeleteLoading(id)
      await apiDeletePerson(id)
      // Atualizar lista após deletar
      setPeople(people.filter(person => person._id !== id))
    } catch (err) {
      alert('Erro ao deletar pessoa: ' + err.message)
    } finally {
      setDeleteLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="container py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Carregando...</span>
          </div>
          <p className="mt-2">Carregando pessoas...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Erro ao carregar dados!</h4>
          <p>{error}</p>
          <hr />
          <p className="mb-0">
            Certifique-se de que a API está rodando em http://localhost:3000
          </p>
          <button className="btn btn-danger mt-2" onClick={fetchPeople}>
            Tentar novamente
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Lista de Pessoas</h2>
        <Link to="/cadastro" className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>
          Nova Pessoa
        </Link>
      </div>

      {people.length === 0 ? (
        <div className="alert alert-info" role="alert">
          <h4 className="alert-heading">Nenhuma pessoa cadastrada</h4>
          <p>Não há pessoas cadastradas no sistema ainda.</p>
          <hr />
          <p className="mb-0">
            <Link to="/cadastro" className="alert-link">Clique aqui</Link> para cadastrar a primeira pessoa.
          </p>
        </div>
      ) : (
        <div className="card shadow">
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Nome</th>
                    <th>Salário</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {people.map((person) => (
                    <tr key={person._id}>
                      <td>{person.name}</td>
                      <td>
                        R$ {person.salary ? person.salary.toLocaleString('pt-BR', { 
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2 
                        }) : '0,00'}
                      </td>
                      <td>
                        {person.approved ? (
                          <span className="badge bg-success">Aprovado</span>
                        ) : (
                          <span className="badge bg-warning text-dark">Pendente</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(person._id)}
                          disabled={deleteLoading === person._id}
                        >
                          {deleteLoading === person._id ? (
                            <>
                              <span className="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>
                              Deletando...
                            </>
                          ) : (
                            <>
                              <i className="bi bi-trash me-1"></i>
                              Deletar
                            </>
                          )}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-3">
              <p className="text-muted mb-0">
                Total de pessoas: <strong>{people.length}</strong>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Listagem
