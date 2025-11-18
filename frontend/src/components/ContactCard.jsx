import React from 'react'
import { useNavigate } from 'react-router-dom'

// Cartão de contato: exibe dados e ações (editar/remover)
// onRemove é fornecido pelo pai (Listagem)
const ContactCard = ({ contato, onRemove }) => { // Recebe onRemove como prop
  const navigate = useNavigate()

  const handleRemover = () => {
    if (window.confirm(`Deseja remover o contato "${contato.name}"?`)) {
      onRemove(contato._id) // usa _id como chave
    }
  }

  const handleEdit = () => {
    navigate(`/cadastro/${contato._id}`)
  }

  return (
    <div className="card h-100">
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{contato.name}</h5>
        <p className="card-text flex-grow-1">
          <strong>Salário:</strong> {contato.salary ?? '-'}<br />
          <strong>Aprovado:</strong> {contato.approved ? 'Sim' : 'Não'}
        </p>
        <div className="mt-auto d-flex gap-2">
          <button className="btn btn-sm btn-primary flex-fill" onClick={handleEdit}>Editar</button>
          <button className="btn btn-sm btn-danger flex-fill" onClick={handleRemover}>Remover</button>
        </div>
      </div>
    </div>
  )
}

export default ContactCard
