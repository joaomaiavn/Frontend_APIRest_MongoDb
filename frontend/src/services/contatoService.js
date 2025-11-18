/*
  Serviço de acesso à API de Pessoas (Person).
  Centraliza as chamadas HTTP usadas pelas páginas (Listagem/Cadastro).
*/
/* global fetch */

/**
 * URL base da API. Em dev pode ser configurada via Vite: VITE_API_URL
 * Fallback para http://localhost:3000 (backend local)
 */
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

/** Obtém todos os contatos (GET /person) */
export async function getContatos() {
  const res = await fetch(`${API_BASE}/person`);
  if (!res.ok) throw new Error("Falha ao obter contatos");
  return res.json();
}

/** Obtém um contato por id (GET /person/:id) */
export async function getContato(id) {
  const res = await fetch(`${API_BASE}/person/${id}`);
  if (!res.ok) throw new Error("Falha ao obter contato");
  return res.json();
}

/** Cria um contato (POST /person) */
export async function createContato(data) {
  const res = await fetch(`${API_BASE}/person`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Falha ao criar contato");
  return res.json();
}

/** Atualiza um contato (PATCH /person/:id) */
export async function updateContato(id, data) {
  const res = await fetch(`${API_BASE}/person/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Falha ao atualizar contato");
  return res.json();
}

/** Remove um contato (DELETE /person/:id) */
export async function deleteContato(id) {
  const res = await fetch(`${API_BASE}/person/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Falha ao deletar contato");
  return res.json();
}