import { useState } from 'react';

const CreateClientForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    model: '',
    year: '',
    brand: '',
    plate: '',
    oil_date: '',
    notify: 0
  });
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? (checked ? 1 : 0) : value; // Manejar el valor del checkbox como booleano
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar datos al servidor para crear un nuevo cliente
      const response = await fetch('http://localhost:4000/clientes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          notify: formData.notify
        }),
      });
      window.location.replace('/admin')
      const data = await response.json();

      setShowSuccessMessage(true);
      setMessage('Cliente creado exitosamente');
      setTimeout(() => {
        setShowSuccessMessage(false);
        setMessage('');
      }, 3000);
     
    } catch (error) {
      console.error('Error al crear el cliente:', error);
      
    }
  };

  return (


    <>
    {console.log(formData)}
      <h1>Crear Nuevo Cliente</h1>
      <form onSubmit={handleSubmit}>
        <input required type="text" name="name" placeholder="Nombre" value={formData.name} onChange={handleChange} /><br />
        <input required type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} /><br />
        <input required type="mail" name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />
        <input required type="number" name="year" placeholder="Año" value={formData.year} onChange={handleChange} /><br />
        <input required type="text" name="model" placeholder="Modelo" value={formData.model} onChange={handleChange} /><br />
        <input required type="text" name="brand" placeholder="Marca" value={formData.brand} onChange={handleChange} /><br />
        <input required type="text" name="plate" placeholder="Placa" value={formData.plate} onChange={handleChange} /><br />
        <input required type="date" name="oil_date" value={formData.oil_date} onChange={handleChange} /><br />
        <label>Notificar</label><br />
        <input type="checkbox" checked={formData.notify === 1} name='notify' onChange={handleChange}></input><br />
        <button type="submit">Guardar</button>
      </form>
      <button onClick={() => window.location = '/admin'}>Cancelar</button>
      {showSuccessMessage && <h1>{message}</h1>}
    </>
  );
};

export default CreateClientForm;
