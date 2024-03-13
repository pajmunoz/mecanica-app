import React, { useState, useEffect } from 'react';
import ClientList from "../lists/ClientList"

export default function AdminPage({ handleLogout, username }) {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);

  // Función para obtener los datos del servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/clientes');
        const data = await response.json();
        setClientes(data);
        setLoading(false); // Cambiar estado a false después de cargar los datos
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        setLoading(false); // Cambiar estado a false en caso de error también
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleDeleteClient = async (clientId) => {
    try {
      const response = await fetch(`http://localhost:4000/clientes/${clientId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar cliente');
      }
      // Actualizar la lista de clientes después de eliminar el cliente
      const updatedClientes = clientes.filter(cliente => cliente.id !== clientId);
      setClientes(updatedClientes);
      setLoading(false);
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      setLoading(false);
      // Mostrar mensaje de error al usuario u otra acción necesaria
    }
  };

  return (
    
    <>
      <div>AdminPage</div>
      <p>Bienvenido {username}</p>
      <button onClick={handleLogout}>Cerrar Sesion</button>
      <p>Notificaciones</p>
      <p>Lista de Clientes</p>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {clientes.map(client => (
            <ClientList key={client.id} data={client} onDelete={handleDeleteClient} />
          ))}
          <button onClick={() => (window.location.href = '/createClient')}>
            Agregar cliente
          </button>
        </>
      )}
    </>
  )
}
