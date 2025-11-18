import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createContato, getContato, updateContato } from "../services/contatoService.js";

export default function Cadastro() {
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [approved, setApproved] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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
        setEmail(p.email || "");
        setPhone(p.phone || "");
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
      const payload = { name, salary: salary === "" ? undefined : Number(salary), approved, email, phone };
      if (id) {
        const updated = await updateContato(id, payload);
        // passa o documento atualizado para a listagem e evita novo fetch
        navigate("/listagem", { state: { updated } });
      } else {
        const created = await createContato(payload);
        // passa o documento criado para a listagem e evita novo fetch
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
        <label className="form-label">E-mail</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@exemplo.com" type="email" className="form-control" />
      </div>
      <div className="col-md-6">
        <label className="form-label">Telefone</label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(99) 99999-9999" type="tel" className="form-control" />
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