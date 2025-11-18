import { useState } from 'react'
import { apiCreatePerson } from '../api'
import { useNavigate } from 'react-router-dom'

function Cadastro() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    approved: false,
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage({ type: '', text: '' })

    // Validação
    if (!formData.name.trim()) {
      setMessage({ type: 'danger', text: 'O nome é obrigatório!' })
      return
    }

    if (!formData.salary || formData.salary <= 0) {
      setMessage({ type: 'danger', text: 'O salário deve ser maior que zero!' })
      return
    }

    setLoading(true)

    try {
      const person = {
        name: formData.name.trim(),
        salary: parseFloat(formData.salary),
        approved: formData.approved,
      }

      await apiCreatePerson(person)
      setMessage({ type: 'success', text: 'Pessoa cadastrada com sucesso!' })
      
      // Limpar formulário
      setFormData({
        name: '',
        salary: '',
        approved: false,
      })

      // Redirecionar após 2 segundos
      setTimeout(() => {
        navigate('/listagem')
      }, 2000)
    } catch (error) {
      setMessage({ type: 'danger', text: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Cadastrar Pessoa</h2>

              {message.text && (
                <div className={`alert alert-${message.type} alert-dismissible fade show`} role="alert">
                  {message.text}
                  <button 
                    type="button" 
                    className="btn-close" 
                    onClick={() => setMessage({ type: '', text: '' })}
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
                    Salário <span className="text-danger">*</span>
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
                    required
                  />
                </div>

                <div className="mb-3 form-check">
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

                <div className="d-grid gap-2">
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
                      'Cadastrar'
                    )}
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={() => navigate('/')}
                    disabled={loading}
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cadastro
