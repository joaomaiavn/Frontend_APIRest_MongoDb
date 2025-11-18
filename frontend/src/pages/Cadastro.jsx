import { useState } from 'react'
import { apiCreatePerson } from '../api'

function Cadastro() {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    approved: false,
  })
  
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    setError(null)

    // Validação simples
    if (!formData.name.trim()) {
      setError('O nome é obrigatório!')
      setLoading(false)
      return
    }

    try {
      const personData = {
        name: formData.name,
        salary: formData.salary ? Number(formData.salary) : 0,
        approved: formData.approved,
      }

      const result = await apiCreatePerson(personData)
      setMessage(result.message || 'Pessoa cadastrada com sucesso!')
      
      // Limpar formulário
      setFormData({
        name: '',
        salary: '',
        approved: false,
      })
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar pessoa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0">Cadastrar Nova Pessoa</h2>
            </div>
            <div className="card-body">
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

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Nome <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Digite o nome"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="salary" className="form-label">
                    Salário
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Digite o salário"
                    step="0.01"
                    min="0"
                  />
                </div>

                <div className="mb-4">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="approved"
                      name="approved"
                      checked={formData.approved}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="approved">
                      Aprovado
                    </label>
                  </div>
                </div>

                <div className="d-grid">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Cadastrando...
                      </>
                    ) : (
                      'Cadastrar Pessoa'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="mt-3 text-muted small">
            <p className="mb-0">
              <span className="text-danger">*</span> Campos obrigatórios
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
