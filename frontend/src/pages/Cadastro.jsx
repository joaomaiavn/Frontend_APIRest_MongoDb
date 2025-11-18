import React, { useState } from 'react';
import { createPerson } from '../api';

function Cadastro() {
  const [formData, setFormData] = useState({
    name: '',
    salary: '',
    approved: false,
  });
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    // Validação
    if (!formData.name.trim()) {
      setError('O nome é obrigatório!');
      return;
    }

    try {
      const personData = {
        name: formData.name,
        salary: formData.salary ? parseFloat(formData.salary) : 0,
        approved: formData.approved,
      };

      const result = await createPerson(personData);
      setMessage(result.message || 'Pessoa cadastrada com sucesso!');
      
      // Limpar formulário
      setFormData({
        name: '',
        salary: '',
        approved: false,
      });
    } catch (err) {
      setError(err.message || 'Erro ao cadastrar pessoa. Tente novamente.');
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title text-center mb-4">Cadastrar Nova Pessoa</h2>
              
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
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

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Cadastrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
