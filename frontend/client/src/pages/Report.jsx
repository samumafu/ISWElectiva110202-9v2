import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
  // Estado para guardar los datos de la API
  const [data, setData] = useState([]);
  
  // Llamada a la API cuando el componente se monta
  useEffect(() => {
    axios.get('http://localhost:8000/report/')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching report data', error);
      });
  }, []);
  
  // Si no hay datos, mostrar un mensaje de carga
  if (data.length === 0) {
    return <div>Loading...</div>;
  }

  // Preparación de los datos para los gráficos
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
      <h2>Report - Inventory Distribution</h2>

      {/* Gráfico de barras para el stock por categoría */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="stock_quantity" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>

      {/* Gráfico de barras para ventas totales por categoría */}
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="total_sales" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Report;
