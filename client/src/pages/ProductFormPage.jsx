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

  const [products, setProducts] = useState([]);
  const [hasExpiration, setHasExpiration] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getProductById(id).then((data) => {
        setProduct(data);
        if (data.expiration_date) setHasExpiration(true);
      });
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
      // Aseguramos que si no es un producto perecedero, no se pase la fecha de vencimiento
      if (!hasExpiration) {
        product.expiration_date = null; // En caso de que no sea perecedero, se asigna como null
      }

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
    <div className="max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        {id ? "Editar Producto" : "Agregar Producto"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10">
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Nombre del producto"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">Seleccione una categoría</option>
          <option value="Alimentos">Alimentos</option>
          <option value="Electrónica">Electrónica</option>
          <option value="Ropa">Ropa</option>
          <option value="Hogar">Hogar</option>
          <option value="Otro">Otro</option>
        </select>

        <input
          type="text"
          name="code"
          value={product.code}
          onChange={handleChange}
          placeholder="Código del producto"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="purchase_price"
            value={product.purchase_price}
            onChange={handleChange}
            placeholder="Precio de compra"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="sale_price"
            value={product.sale_price}
            onChange={handleChange}
            placeholder="Precio de venta"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <input
          type="number"
          name="stock_quantity"
          value={product.stock_quantity}
          onChange={handleChange}
          placeholder="Cantidad en stock"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="date"
          name="entry_date"
          value={product.entry_date}
          onChange={handleChange}
          placeholder="Fecha de entrada"
          className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="hasExpiration"
            checked={hasExpiration}
            onChange={(e) => setHasExpiration(e.target.checked)}
            className="accent-blue-600 w-5 h-5"
          />
          <label htmlFor="hasExpiration" className="text-gray-700 text-lg">
            Producto perecedero (tiene fecha de vencimiento)
          </label>
        </div>

        {hasExpiration && (
          <input
            type="date"
            name="expiration_date"
            value={product.expiration_date}
            onChange={handleChange}
            placeholder="Fecha de vencimiento"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          {id ? "Actualizar Producto" : "Agregar Producto"}
        </button>
      </form>

      <h3 className="text-2xl font-bold mb-4 text-gray-800">Lista de Productos</h3>

      <ul className="space-y-2">
        {products.map((prod) => (
          <li
            key={prod.id}
            className="bg-gray-100 px-4 py-3 rounded-xl flex justify-between items-center shadow-sm"
          >
            <span className="font-medium text-gray-700">
              {prod.name} — {prod.category}
            </span>
            <div className="space-x-2">
              <button
                onClick={() => navigate(`/products/${prod.id}`)}
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-xl transition"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(prod.id)}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-xl transition"
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
