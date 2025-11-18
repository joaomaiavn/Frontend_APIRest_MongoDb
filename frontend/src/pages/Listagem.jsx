import React, { useEffect, useState } from 'react';
import { apiGetPeople } from '../api';

export default function Listagem() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const data = await apiGetPeople();
      setPeople(data || []);
    } catch (err) {
      console.error(err);
      setError('Erro ao carregar: ' + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Listagem</h2>
        <button className="btn btn-outline-primary" onClick={load}>Atualizar</button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          {loading && <div>Carregando...</div>}
          {error && <div className="alert alert-danger">{error}</div>}
          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Salary</th>
                    <th>Aprovado</th>
                  </tr>
                </thead>
                <tbody>
                  {people.length === 0 && (
                    <tr><td colSpan="3" className="text-center">Nenhum registro</td></tr>
                  )}
                  {people.map(p => (
                    <tr key={p._id || p.id}>
                      <td>{p.name}</td>
                      <td>{p.salary}</td>
                      <td>{p.approved ? 'Sim' : 'Não'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
