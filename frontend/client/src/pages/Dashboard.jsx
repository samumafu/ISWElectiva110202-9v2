import { useEffect, useState } from "react";
import { getAllProducts } from "../api/product.api";
import { Link } from "react-router-dom";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function Dashboard() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function loadProducts() {
      const data = await getAllProducts();
      setProducts(data);
    }
    loadProducts();
  }, []);

  const totalProducts = products.length;
  const lowStock = products.filter(p => p.stock_quantity <= 5).length;
  const totalInventoryValue = products.reduce(
    (acc, p) => acc + (parseFloat(p.sale_price || 0) * p.stock_quantity),
    0
  );

  const generateCSV = () => {
    const csvData = products.map(p => ({
      ID: p.id,
      Nombre: p.name,
      Categoría: p.category,
      Stock: p.stock_quantity,
      Precio: p.sale_price,
    }));

    const csv = [
      ["ID", "Nombre", "Categoría", "Stock", "Precio"],
      ...csvData.map(row => [row.ID, row.Nombre, row.Categoría, row.Stock, row.Precio]),
    ]
      .map(e => e.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "productos.csv");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Reporte de Productos", 20, 20);
    doc.autoTable({
      head: [["ID", "Nombre", "Categoría", "Stock", "Precio"]],
      body: products.map(p => [p.id, p.name, p.category, p.stock_quantity, p.sale_price]),
      startY: 30,
    });
    doc.save("productos.pdf");
  };

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      <h1 className="text-4xl font-extrabold mb-6 text-gray-800">📊 Panel de Control</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-500 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl mb-2 font-semibold">Productos Totales</h2>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>
        <div className="bg-red-500 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl mb-2 font-semibold">Stock Bajo</h2>
          <p className="text-3xl font-bold">{lowStock}</p>
        </div>
        <div className="bg-green-500 text-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-xl mb-2 font-semibold">Valor Inventario</h2>
          <p className="text-3xl font-bold">${totalInventoryValue}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <Link to="/add-product" className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg shadow transition">
          ➕ Registrar Producto
        </Link>
        <button onClick={generateCSV} className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg shadow transition">
          📄 Generar CSV
        </button>
        <button onClick={generatePDF} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow transition">
          📑 Generar PDF
        </button>
        <Link to="/settings" className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow transition">
          ⚙️ Configuración
        </Link>
        <Link to="/Report" className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg shadow transition">
          ⚙️ Informes
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="text-3xl font-bold mb-6 text-gray-700">📦 Inventario Actual</h2>
        <input
          type="text"
          placeholder="🔍 Buscar producto..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 rounded-lg p-3 w-full mb-6 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <div className="overflow-x-auto rounded-xl shadow">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border p-4">ID</th>
                <th className="border p-4">Nombre</th>
                <th className="border p-4">Categoría</th>
                <th className="border p-4">Stock</th>
                <th className="border p-4">Precio Venta</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(p => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="border p-4">{p.id}</td>
                  <td className="border p-4">{p.name}</td>
                  <td className="border p-4">{p.category}</td>
                  <td className={`border p-4 ${p.stock_quantity <= 5 ? "text-red-600 font-semibold" : ""}`}>
                    {p.stock_quantity}
                  </td>
                  <td className="border p-4">${p.sale_price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
