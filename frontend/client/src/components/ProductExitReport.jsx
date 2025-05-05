import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getProductById, updateProductStock } from "../api/product.api";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

export function ProductExitReport() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [exitReason, setExitReason] = useState("");
  const [responsibleUser, setResponsibleUser] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (error) {
        alert("Error al cargar producto. Verifica el ID.");
        navigate("/products");
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [productId, navigate]);

  if (loading) return <div className="p-6">Cargando...</div>;

  if (!product) return null;

  const subtotal = product.sale_price * quantity;
  const iva = subtotal * 0.19;
  const total = subtotal + iva;

  const handleSubmit = async () => {
    if (!exitReason || !responsibleUser || quantity <= 0) {
      alert("Todos los campos son obligatorios.");
      return;
    }
  
    if (quantity > product.stock_quantity) {
      alert("Cantidad mayor al stock disponible.");
      return;
    }
  
    try {
      const newStock = product.stock_quantity - quantity;
      await updateProductStock(product.id, newStock, product);  // Actualizamos el stock
      generatePDFReport();  // Generamos el PDF
      alert("Salida registrada con éxito.");
      navigate("/products");
    } catch (error) {
      alert("Error al registrar salida.");
      console.error(error);
    }
  };

  const generatePDFReport = () => {
    const doc = new jsPDF();
    const now = new Date();
    const dateTime = now.toLocaleString();
    const reportNumber = `RPT-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;

    doc.setFontSize(16);
    doc.text("📦 Reporte de Salida de Producto", 14, 20);
    doc.setFontSize(12);
    doc.text(`Reporte Nº: ${reportNumber}`, 14, 30);
    doc.text(`Fecha: ${dateTime}`, 14, 36);
    doc.text(`Responsable: ${responsibleUser}`, 14, 42);
    doc.text(`Motivo: ${exitReason}`, 14, 48);

    doc.autoTable({
      startY: 55,
      head: [["Producto", "Precio Unitario", "Cantidad", "Subtotal"]],
      body: [
        [product.name, `$${product.sale_price}`, quantity, `$${subtotal.toFixed(2)}`],
      ],
    });

    doc.text(`Subtotal: $${subtotal.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 10);
    doc.text(`IVA (19%): $${iva.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 15);
    doc.text(`Total: $${total.toFixed(2)}`, 14, doc.lastAutoTable.finalY + 20);

    doc.save(`${reportNumber}.pdf`);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">📤 Salida de: {product.name}</h1>

      <div>
        <p><strong>Precio:</strong> ${product.sale_price}</p>
        <p><strong>Stock Disponible:</strong> {product.stock_quantity}</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="font-semibold">Cantidad a retirar:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            max={product.stock_quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="font-semibold">Motivo:</label>
          <select
            value={exitReason}
            onChange={(e) => setExitReason(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Selecciona una opción</option>
            <option value="Venta">Venta</option>
            <option value="Daño">Daño</option>
            <option value="Vencimiento">Vencimiento</option>
            <option value="Ajuste de stock">Ajuste de stock</option>
          </select>
        </div>

        <div>
          <label className="font-semibold">Responsable:</label>
          <input
            type="text"
            value={responsibleUser}
            onChange={(e) => setResponsibleUser(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="bg-gray-100 p-4 rounded shadow">
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>IVA (19%):</strong> ${iva.toFixed(2)}</p>
          <p><strong>Total:</strong> ${total.toFixed(2)}</p>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Confirmar salida
          </button>
        </div>
      </div>
    </div>
  );
}
