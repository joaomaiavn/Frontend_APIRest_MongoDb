const API_URL = 'http://localhost:3000/person'

export async function apiGetPeople() {
  try {
    const response = await fetch(API_URL)
    if (!response.ok) {
      throw new Error('Erro ao buscar pessoas')
    }
    return await response.json()
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}

export async function apiCreatePerson(person) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(person),
    })
    
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Erro ao criar pessoa')
    }
    
    return await response.json()
  } catch (error) {
    console.error('Erro na requisição:', error)
    throw error
  }
}
