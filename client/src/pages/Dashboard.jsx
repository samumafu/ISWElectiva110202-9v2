import { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock_quantity <= 5).length;
  const totalSales = products.reduce((acc, p) => acc + parseFloat(p.sale_price || 0), 0);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-3xl font-bold mb-4">Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-600 text-white p-4 rounded">Productos Totales: {totalProducts}</div>
        <div className="bg-red-600 text-white p-4 rounded">Stock Bajo: {lowStock}</div>
        <div className="bg-green-600 text-white p-4 rounded">Valor de Inventario: ${totalSales}</div>
      </div>

      <div className="flex gap-2 mt-4">
        <Link to="/add-product" className="bg-green-600 text-white px-4 py-2 rounded">Registrar Producto</Link>
        <button className="bg-yellow-600 text-white px-4 py-2 rounded">Generar Informe</button>
        <button className="bg-gray-600 text-white px-4 py-2 rounded">Configuración</button>
      </div>

      <h2 className="text-xl font-bold mt-8">Inventario Actual</h2>
      <input type="text" placeholder="Buscar producto..." className="border p-2 w-full mb-4" />

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th>ID</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Stock</th>
            <th>Precio Venta</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.name}</td>
              <td>{p.category}</td>
              <td className={p.stock_quantity <= 5 ? "text-red-600 font-bold" : ""}>{p.stock_quantity}</td>
              <td>${p.sale_price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
