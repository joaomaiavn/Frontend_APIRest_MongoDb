const API_BASE = 'http://localhost:3000/person';

/**
 * Busca todas as pessoas (GET /person)
 */
export async function apiGetPeople() {
  const res = await fetch(API_BASE);
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Status ${res.status}: ${txt}`);
  }
  return res.json();
}

/**
 * Cria pessoa (POST /person) com { name, salary, approved }
 */
export async function apiCreatePerson(person) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(person)
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`Status ${res.status}: ${txt}`);
  }
  return res.json();
}
