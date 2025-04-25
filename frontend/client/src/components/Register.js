import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [form, setForm] = useState({ first_name: '', last_name: '', username: '', password: '', password2: '' });

  const handleChange = (e) => {
    setForm({...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.password !== form.password2) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    axios.post('http://localhost:8000/api/register/', form)
      .then(res => {
        alert("Usuario registrado correctamente.");
      })
      .catch(err => {
        alert("Error al registrar: " + JSON.stringify(err.response.data));
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="first_name" placeholder="Nombre" onChange={handleChange} />
      <input type="text" name="last_name" placeholder="Apellido" onChange={handleChange} />
      <input type="text" name="username" placeholder="Usuario" onChange={handleChange} />
      <input type="password" name="password" placeholder="Contraseña" onChange={handleChange} />
      <input type="password" name="password2" placeholder="Confirmar Contraseña" onChange={handleChange} />
      <button type="submit">Registrarse</button>
    </form>
  );
}

export default Register;
