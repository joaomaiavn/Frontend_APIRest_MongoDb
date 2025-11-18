import React, { useState } from 'react';
import { apiCreatePerson } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Cadastro() {
  const [name, setName] = useState('');
  const [salary, setSalary] = useState('');
  const [approved, setApproved] = useState(false);
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg(null);

    if (!name.trim()) {
      setMsg({ type: 'danger', text: 'Nome é obrigatório.' });
      return;
    }

    const payload = {
      name: name.trim(),
      salary: Number(salary) || 0,
      approved: Boolean(approved)
    };

    try {
      await apiCreatePerson(payload);
      setMsg({ type: 'success', text: 'Pessoa cadastrada com sucesso.' });
      setName('');
      setSalary('');
      setApproved(false);
      setTimeout(() => navigate('/listagem'), 900);
    } catch (err) {
      console.error(err);
      setMsg({ type: 'danger', text: 'Erro ao cadastrar: ' + err.message });
    }
  }

  return (
    <div className="row">
      <div className="col-md-6 mx-auto">
        <div className="card shadow-sm">
          <div className="card-body">
            <h2 className="card-title mb-4">Cadastro</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nome</label>
                <input className="form-control" value={name} onChange={e => setName(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input className="form-control" type="number" value={salary} onChange={e => setSalary(e.target.value)} />
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="approved" checked={approved} onChange={e => setApproved(e.target.checked)} />
                <label className="form-check-label" htmlFor="approved">Aprovado</label>
              </div>
              <div className="d-flex gap-2">
                <button className="btn btn-success" type="submit">Salvar</button>
                <button className="btn btn-outline-secondary" type="button" onClick={() => { setName(''); setSalary(''); setApproved(false); }}>Limpar</button>
              </div>
            </form>

            {msg && <div className={`alert alert-${msg.type} mt-3`}>{msg.text}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
