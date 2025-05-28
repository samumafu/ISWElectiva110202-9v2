import axios from 'axios';

// Usamos variable de entorno o fallback a localhost solo en desarrollo
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
const API_URL = `${API_BASE_URL}/products/`;

export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) throw new Error('Error al actualizar producto');
  return await response.json();
}

export async function deleteProduct(id) {
  const response = await fetch(`${API_URL}${id}/`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Error al eliminar producto');
  return response.status;
}

export async function updateProductStock(productId, newStock, originalProduct) {
  try {
    const updatedProduct = {
      ...originalProduct,
      stock_quantity: newStock,
      expiration_date: originalProduct.expiration_date || null,
    };

    const response = await axios.put(`${API_URL}${productId}/`, updatedProduct);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error detallado del backend:", error.response.data);
    } else if (error.request) {
      console.error("No hubo respuesta del servidor:", error.request);
    } else {
      console.error("Error al configurar la solicitud:", error.message);
    }
    throw new Error("Error al actualizar producto");
  }
}


