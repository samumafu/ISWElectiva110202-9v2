import { useEffect, useState } from "react";
import { getAllProducts, deleteProduct } from "../api/product.api";
import { useNavigate } from "react-router-dom";

export function ProductList() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const loadProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este producto?")) {
      await deleteProduct(id);
      loadProducts();
    }
  };

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">📦 Lista de Productos</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition"
        >
          ➕ Agregar Producto
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition transform hover:scale-105">
            <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
            <p className="text-gray-600 mt-2">Categoría: {product.category}</p>
            <p className="text-gray-600 mt-2">Precio Venta: ${product.sale_price}</p>
            <p className={`mt-2 ${product.stock_quantity <= 5 ? "text-red-600 font-semibold" : "text-gray-800"}`}>
              Stock: {product.stock_quantity}
            </p>
            <div className="mt-4 flex space-x-4">
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Eliminar
              </button>
              <button
                onClick={() => navigate(`/product-exit-report/${product.id}`)} // Navegar a la salida de productos con el id
                className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition"
              >
                Salida
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
