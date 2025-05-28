import React, { useState, useEffect } from 'react'; 
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Report = () => {
  const [data, setData] = useState([]);

  const backendURL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

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
      <h2>Report - Inventory Distribution</h2>

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
