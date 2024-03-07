import React, { useState, useEffect } from 'react';
import ClientList from "../lists/ClientList"

export default function AdminPage({ handleLogout, username }) {

  const [clientes, setClientes] = useState([]);

  // Función para obtener los datos del servidor
  useEffect(() => {
    fetch('http://localhost:4000/clientes') // Cambia la URL según la ruta de tu servidor
      .then(response => response.json())
      .then(data => setClientes(data))
      .catch(error => console.error('Error al obtener datos del servidor:', error));
  }, []); // Se ejecuta solo una vez al montar el componente

  
  return (
    
    <>
      <div>AdminPage</div>
      <p>Bienvenido {username}</p>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <p>Notificaciones</p>
      <p>Lista de Clientes</p>
      {
        clientes.map(client => <ClientList key={client.id} data={client} />
        )}
      <button onClick={() => window.location = '/createClient'}>Agregar cliente</button>
    </>
  )
}
