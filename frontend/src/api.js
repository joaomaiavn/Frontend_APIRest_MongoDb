const API_BASE_URL = 'http://localhost:3000';

export async function apiGetPeople() {
  const response = await fetch(`${API_BASE_URL}/person`);
  if (!response.ok) {
    throw new Error('Erro ao buscar pessoas');
  }
  return response.json();
}

export async function apiCreatePerson(person) {
  const response = await fetch(`${API_BASE_URL}/person`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(person),
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Erro ao criar pessoa');
  }
  return response.json();
}

export async function apiDeletePerson(id) {
  const response = await fetch(`${API_BASE_URL}/person/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error('Erro ao deletar pessoa');
  }
  return response.json();
}
