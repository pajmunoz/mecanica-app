import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function EditClientForm({ handleEdit }) {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [cliente, setCliente] = useState([]);

  const handleCancel = async (e) => {
    window.location.replace('/admin')
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/clientes/${id}`);
        if (!response.ok) {
          throw new Error('Error al obtener datos del servidor');
        }
        const data = await response.json();
        setCliente(data);
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      } finally {
        setLoading(false); // Se ejecuta tanto en éxito como en error
      }
    };

    fetchData();
  }, [id]); // Se ejecuta cada vez que id cambia
  return (
    <>
      {loading ? <div>loading...</div> : <>
        <h1>{cliente.name}</h1>
        <form onSubmit={handleEdit}>
          <input type="text" name="name" placeholder={cliente.name} /><br />
          <input type="text" name="lastname" placeholder={cliente.lastName} /><br />
          <input type="text" name="model" placeholder={cliente.model} /><br />
          <input type="text" name="brand" placeholder={cliente.brand} /><br />
          <input type="text" name="plate" placeholder={cliente.plate} /><br />
          <input type="date" name="oil_date" value={formatDate(cliente.oil_date)} /><br />
          <button type="submit">Guardar</button>
        </form>
        <button onClick={handleCancel}>Cancelar</button>
      </>
      }
      {console.log(cliente)}

    </>
  )
}
