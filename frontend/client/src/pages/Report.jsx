import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
  const [data, setData] = useState([]);

  const backendURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';


  useEffect(() => {
    axios.get(`${backendURL}/report/`)
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching report data', error);
      });
  }, [backendURL]);

  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  const stockData = data.map(item => ({
    category: item.category,
    stock_quantity: item.stock_quantity
  }));

  const salesData = data.map(item => ({
    category: item.category,
    total_sales: item.total_sales
  }));

  return (
    <div style={{ padding: '20px' }}>
      <h2>Reporte - Distribución del Inventario</h2>

      <h3 style={{ marginTop: '40px', marginBottom: '10px' }}>Cantidad en Stock por Categoría</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend
            formatter={() => 'Cantidad en Stock'}
          />
          <Bar dataKey="stock_quantity" fill="#8884d8" name="Cantidad en Stock" />
        </BarChart>
      </ResponsiveContainer>

      <h3 style={{ marginTop: '60px', marginBottom: '10px' }}>Ganancias Esperadas del Stock por Categoría</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend
            formatter={() => 'Ganancias Esperadas del Stock'}
          />
          <Bar dataKey="total_sales" fill="#82ca9d" name="Ganancias Esperadas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;
