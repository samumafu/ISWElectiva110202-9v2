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
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Lista de Productos</h1>
        <button
          onClick={() => navigate("/add-product")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Agregar Producto
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {products.map((product) => (
          <div key={product.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>Categoría: {product.category}</p>
            <p>Precio Venta: ${product.sale_price}</p>
            <p>Stock: {product.stock_quantity}</p>
            <div className="mt-2 flex space-x-2">
              <button
                onClick={() => navigate(`/edit-product/${product.id}`)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
