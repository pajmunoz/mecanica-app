import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
export default function ClientList({ data, onDelete }) {
  const [citaCount, setCitaCount] = useState(0);
  const handleEditUser = (userId) => {
    // Guardar el ID del usuario que se está editando en el estado local
    console.log('hi')
    //setEditingUserId(userId);
    // Aquí puedes implementar la lógica para abrir un formulario de edición o cualquier otra interfaz de usuario
    window.location = `/edit/${data.id}`
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDelete = () => {
    onDelete(data.id);
    console.log('delete')
  }



  useEffect(() => {
    if (data) {
      fetchCitaCount();
    }
  }, [data]); // Se ejecuta cuando 'data' cambia

  const fetchCitaCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/clientes/${data.id}/citas/count`);
      if (!response.ok) {
        throw new Error('Error al obtener cantidad de citas');
      }
      const responseData = await response.json();
      setCitaCount(responseData.citaCount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <ul>
        <li>id {data.id}</li>
        <li>Nombre: {data.name}</li>
        <li>Apellido: {data.lastName}</li>
        <li>Correo:  {data.email}</li>
        <li>Marca:{data.brand}</li>
        <li>Modelo: {data.model}</li>
        <li>Año: {data.year}</li>
        <li>Placa: {data.plate}</li>
        <li>Ultimo cambio de aceite: {formatDate(data.oil_date)}</li>
        <li>Notificar: {<input type="checkbox" checked={data.notify} readOnly></input>}</li>
        {data && (
        <p>Cantidad de Citas: {citaCount}</p>
      )}
        <Link to={`/book/${data.id}`}>Agregar Cita</Link>
        <button onClick={handleEditUser}>Editar</button>
        <button onClick={handleDelete}>Borrar</button>

      </ul>
    </>
  )
}
