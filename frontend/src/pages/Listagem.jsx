import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { getContatos, deleteContato } from "../services/contatoService.js";
import ContactCard from "../components/ContactCard.jsx";

export default function Listagem() {
  const [contatos, setContatos] = useState([]);
  const navigate = useNavigate()

  // Busca inicial de contatos da API
  const load = async () => {
    try {
      const data = await getContatos();
      setContatos(data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar contatos");
    }
  };

  // Se navegou com state (criado/atualizado), mescla na lista
  const location = useLocation();

  useEffect(() => {
    (async () => {
      await load();
      // Mescla itens criados/atualizados recebidos da página de Cadastro
      if (location && location.state) {
        const { created, updated } = location.state;
        if (created) {
          setContatos((prev) => (
            prev.some((c) => c._id === created._id)
              ? prev
              : [created, ...prev]
          ));
        }
        if (updated) {
          setContatos((prev) => prev.map((c) => (c._id === updated._id ? updated : c)));
        }
        // Limpa o state de navegação para evitar mesclar novamente ao re-renderizar
        navigate('.', { replace: true, state: null });
      }
    })();
  }, []);

  // Remove um contato e atualiza a lista localmente
  const handleDelete = async (id) => {
    if (!confirm("Deseja excluir este contato?")) 
      return;
    
    
    try {
      await deleteContato(id);
      setContatos((prev) => prev.filter((c) => c._id !== id));
      
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar");
    }
  };

  if (contatos.length === 0) {
    return (
      <div>
        <h2 className="mb-4">Listagem de Contatos</h2>
        <div className="alert alert-info">
          Nenhum contato cadastrado ainda. <a href="/cadastro">Cadastre um agora!</a>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Voltar ao Home</button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-4">Listagem de Contatos ({contatos.length})</h2>
      <div className="row g-3">
        {contatos.map((contato) => (
          <div key={contato._id} className="col-md-6 col-lg-4">
            <ContactCard 
              contato={contato} 
              onRemove={handleDelete} // Passa a função de remoção como prop
            />
          </div>
        ))}
      </div>
      <div className="mt-3">
        <button className="btn btn-success me-2" onClick={() => navigate('/cadastro')}>
          + Novo Contato
        </button>
        <button className="btn btn-secondary" onClick={() => navigate('/')}>Voltar ao Home</button>
      </div>
    </div>
  );
}
