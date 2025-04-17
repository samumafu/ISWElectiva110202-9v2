import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getAllProducts,
} from "../api/product.api";

export function ProductFormPage() {
  const [product, setProduct] = useState({
    name: "",
    category: "",
    code: "",
    purchase_price: "",
    sale_price: "",
    stock_quantity: "",
    entry_date: "",
    expiration_date: "",
  });

  const [products, setProducts] = useState([]); // Para mostrar la lista
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => setProduct(data));
    }
    loadProducts();
  }, [id]);

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct(id, product);
      } else {
        await createProduct(product);
      }
      navigate("/products");
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    }
  };

  const handleDelete = async (productId) => {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(productId);
      loadProducts();
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{id ? "Editar Producto" : "Agregar Producto"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        {/* Campos */}
        <input type="text" name="name" value={product.name} onChange={handleChange} placeholder="Nombre" className="block w-full border border-gray-300 rounded px-3 py-2" required />
        <select name="category" value={product.category} onChange={handleChange} className="block w-full border border-gray-300 rounded px-3 py-2" required>
          <option value="">Seleccione una categoría</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Ropa">Ropa</option>
          <option value="Hogar">Hogar</option>
          <option value="Otro">Otro</option>
        </select>
        <input type="text" name="code" value={product.code} onChange={handleChange} placeholder="Código" className="block w-full border border-gray-300 rounded px-3 py-2" />
        <input type="number" name="purchase_price" value={product.purchase_price} onChange={handleChange} placeholder="Precio de compra" className="block w-full border border-gray-300 rounded px-3 py-2" />
        <input type="number" name="sale_price" value={product.sale_price} onChange={handleChange} placeholder="Precio de venta" className="block w-full border border-gray-300 rounded px-3 py-2" />
        <input type="number" name="stock_quantity" value={product.stock_quantity} onChange={handleChange} placeholder="Stock" className="block w-full border border-gray-300 rounded px-3 py-2" />
        <input type="date" name="entry_date" value={product.entry_date} onChange={handleChange} className="block w-full border border-gray-300 rounded px-3 py-2" />
        <input type="date" name="expiration_date" value={product.expiration_date} onChange={handleChange} className="block w-full border border-gray-300 rounded px-3 py-2" />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          {id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      <h3 className="text-xl font-bold mb-4">Lista de Productos</h3>
      <ul>
        {products.map((prod) => (
          <li key={prod.id} className="border-b py-2 flex justify-between items-center">
            <span>
              {prod.name} — {prod.category}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/products/${prod.id}`)}
                className="bg-yellow-400 text-white px-3 py-1 rounded"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(prod.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
