const API_URL = 'http://127.0.0.1:8000/products/';

export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  return await response.json();
}

export async function getAllProducts() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${API_URL}${id}/`);
  if (!response.ok) throw new Error('Producto no encontrado');
  return await response.json();
}

export async function updateProduct(id, productData) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}${id}/`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return response.status;
}
