import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function LoginForm({handleLogin, loggedUser}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { username, password });
      console.log(response.data); // Mensaje de éxito
      setIsAuthenticated(true);
      handleLogin(isAuthenticated)
      loggedUser(username)
      navigate('/admin');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <>
      <div>LoginForm</div>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Iniciar sesión</button>
      {error && <p>{error}</p>}
    </form>
    </>
  )
}
