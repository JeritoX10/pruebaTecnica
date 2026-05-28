const API_URL = import.meta.env.VITE_API_URL

async function request(url, options = {}) {
  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text().catch(() => response.statusText)
    throw new Error(message || `Error ${response.status}`)
  }

  if (response.status === 204) return null
  return response.json()
}

export async function getProducts() {
  return request(API_URL)
}

export async function createProduct(product) {
  return request(API_URL, {
    method: 'POST',
    body: JSON.stringify(product),
  })
}

export async function updateProduct(id, product) {
  return request(`${API_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(product),
  })
}

export async function deleteProduct(id) {
  return request(`${API_URL}/${id}`, { method: 'DELETE' })
}
