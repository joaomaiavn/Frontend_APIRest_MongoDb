import { useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'

const ContactCard = ({ contato, onRemove }) => { // Recebe onRemove como prop (do ajuste anterior)

  const handleRemover = () => {
    if (window.confirm(`Deseja remover o contato "${contato.nome}"?`)) {
      onRemove(contato.id) // Chama a função de remoção passada pela Listagem
    }
  }

  return (
    <div className="card h-100 professional-card"> {/* Classe custom do CSS anterior */}
      <div className="card-body d-flex flex-column"> {/* Flex para controlar altura e espaçamento */}
        <h5 className="card-title">
          <i className="bi bi-person-circle me-2 text-primary"></i>{contato.nome}
        </h5>
        <p className="card-text flex-grow-1"> {/* Flex-grow para ocupar espaço disponível */}
          <strong><i className="bi bi-envelope me-1"></i>E-mail:</strong> {contato.email}<br />
          <strong><i className="bi bi-telephone me-1"></i>Telefone:</strong> {contato.telefone}
        </p>
        <div className="card-footer bg-transparent border-0 pt-2"> {/* Footer sutil para data e botão */}
          <small className="text-muted d-block mb-2"> {/* mb-2 para afastar da data do botão */}
            Cadastrado em: {contato.dataCriacao}
          </small>
          <button 
            className="btn btn-outline-danger btn-sm w-100" // Contorno vermelho, menor, largura total para alinhamento
            onClick={handleRemover}
          >
            <i className="bi bi-trash me-1"></i>Remover
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactCard
