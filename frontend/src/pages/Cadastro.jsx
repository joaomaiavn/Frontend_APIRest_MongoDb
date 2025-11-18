import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContato, getContato, updateContato } from "../services/contatoService.js";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [approved, setApproved] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  // Se houver id na rota, carregamos o registro para edição
  useEffect(() => {
    if (!id) return;
    (async () => {
      try {
        const p = await getContato(id);
        setName(p.name || "");
        setSalary(p.salary ?? "");
        setApproved(Boolean(p.approved));
      } catch (err) {
        console.error(err);
        alert("Erro ao carregar contato");
      }
    })();
  }, [id]);

  // Cria ou atualiza e navega para listagem passando o documento criado/atualizado via state
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name, salary: salary === "" ? undefined : Number(salary), approved };
      if (id) {
        const updated = await updateContato(id, payload);
        // pass the updated document to the list view to avoid re-fetch
        navigate("/listagem", { state: { updated } });
      } else {
        const created = await createContato(payload);
        // pass the created document to the list view to avoid re-fetch
        navigate("/listagem", { state: { created } });
      }
    } catch (err) {
      console.error(err);
      alert("Erro ao salvar contato");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="row g-3">
      <div className="col-12">
        <label className="form-label">Nome</label>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required className="form-control" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Salário</label>
        <input value={salary} onChange={(e) => setSalary(e.target.value)} placeholder="Salário" type="number" className="form-control" />
      </div>
      <div className="col-md-6 d-flex align-items-center">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" checked={approved} onChange={(e) => setApproved(e.target.checked)} id="approved" />
          <label className="form-check-label" htmlFor="approved">Aprovado</label>
        </div>
      </div>
      <div className="col-12">
        <button type="submit" className="btn btn-primary">Salvar</button>
      </div>
    </form>
  );
}