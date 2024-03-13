import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
export default function EditClientForm() {
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [cliente, setCliente] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    model: '',
    year: '',
    brand: '',
    plate: '',
    oil_date: '',
    notify:0
  });

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
        setFormData({
          name: data.name,
          lastName: data.lastName,
          email: data.email,
          model: data.model,
          year: data.year,
          brand: data.brand,
          plate: data.plate,
          oil_date: formatDate(data.oil_date),
          notify: data.notify
        });
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
      } finally {
        setLoading(false); // Se ejecuta tanto en éxito como en error
      }
    };

    fetchData();
  }, [id]); // Se ejecuta cada vez que id cambia


  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value; // Manejar el valor del checkbox como booleano
    setFormData({ ...formData, [name]: newValue });
  };

  const handleMessage = (message) => {
    setMessage(message)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:4000/clientes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      setTimeout(() => {
        window.location.replace('/admin')
      }, 2000);
    
      if (!response.ok) {
        throw new Error('Error al actualizar datos del cliente'),
        handleMessage('Error al actualizar datos del cliente!')
      }
      // Manejar la respuesta o redirigir al usuario después de guardar exitosamente
    } catch (error) {
      console.error('Error al actualizar datos del cliente:', error.message),
        handleMessage('Error al actualizar datos del cliente!')
    }
    handleMessage('Cliente Actualizado!')
  };

  return (
    <>
      {loading ? <div>loading...</div> : <>
        <h1>{cliente.name}</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder={formData.name} value={formData.name} onChange={handleChange} /><br />
          <input type="text" name="lastName" placeholder={formData.lastName} value={formData.lastName} onChange={handleChange} /><br />
          <input type="mail" name="email" placeholder={formData.email} value={formData.email} onChange={handleChange} /><br />
          <input type="text" name="model" placeholder={formData.model} value={formData.model} onChange={handleChange} /><br />
          <input type="number" name="year" placeholder={formData.year} value={formData.year} onChange={handleChange} /><br />
          <input type="text" name="brand" placeholder={formData.brand} value={formData.brand} onChange={handleChange} /><br />
          <input type="text" name="plate" placeholder={formData.plate} value={formData.plate} onChange={handleChange} /><br />
          <input type="date" name="oil_date" value={formatDate(formData.oil_date)} onChange={handleChange} /><br />
          <label>Notificar</label><br />
          <input type="checkbox" name='notify' checked={formData.notify} onChange={handleChange}></input><br />
          <button type="submit">Guardar</button>
        </form>
        <button onClick={handleCancel}>Cancelar</button>
        {
         
         showSuccessMessage && <h1>{message}</h1>
         

        }
      </>
      }
    </>
  )
}
