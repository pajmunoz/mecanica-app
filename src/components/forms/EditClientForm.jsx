import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { Url } from '../../constant';

export default function EditClientForm() {
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [cliente, setCliente] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    model: '',
    year: '',
    brand: '',
    plate: '',
    oil_date: '',
    notify: 0
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
        const response = await fetch(`${Url}/clients/${id}`);

        if (!response.ok) {
          throw new Error('Error al obtener datos del servidor');
        }
        const data = await response.json();
        setCliente(data);
        setFormData({
          name: data.name,
          lastname: data.lastname,
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
      const response = await fetch(`${Url}/clients/${id}`, {
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
      <Row>
        <Col></Col>
        <Col md='auto'>
          <h3 className='text-center mt-5'>
            Editar
            <small className="text-body-secondary"> Cliente</small>
          </h3>
          <hr />
          {loading ? <Spinner className='position-absolute top-50 start-50 translate-middle' /> :
            <form onSubmit={handleSubmit}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Nombre
                </InputGroup.Text>
                <Form.Control
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="name" placeholder="Juan" value={formData.name} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Apellido
                </InputGroup.Text>
                <Form.Control
                  aria-label="Apellido"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="lastname" placeholder="Perez" value={formData.lastname} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Correo
                </InputGroup.Text>
                <Form.Control
                  aria-label="Email"
                  aria-describedby="inputGroup-sizing-default"
                  required type="mail" name="email" placeholder="***@****.com" value={formData.email} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Año
                </InputGroup.Text>
                <Form.Control
                  aria-label="Año"
                  aria-describedby="inputGroup-sizing-default"
                  required type="number" name="year" placeholder="1991" value={formData.year} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Modelo
                </InputGroup.Text>
                <Form.Control
                  aria-label="Modelo"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="model" placeholder="Forza" value={formData.model} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Marca
                </InputGroup.Text>
                <Form.Control
                  aria-label="Marca"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="brand" placeholder="Suzuki" value={formData.brand} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Placa
                </InputGroup.Text>
                <Form.Control
                  aria-label="Placa"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="plate" placeholder="OFS-224" value={formData.plate} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Fecha cambio de aceite
                </InputGroup.Text>
                <Form.Control
                  aria-label="Aceite"
                  aria-describedby="inputGroup-sizing-default"
                  required type="date" name="oil_date" value={formData.oil_date} onChange={handleChange}
                />
              </InputGroup>

              <Form.Check
                type="switch" checked={formData.notify === 1} name='notify' onChange={handleChange} label='Notificar al cliente'
              />


              <Button className='w-100 my-2' variant='primary' type="submit">Guardar</Button>
            </form>
          }

          <hr />
          <Button className='w-100 my-2' variant='secondary' onClick={() => window.location = '/admin'}>Cancelar</Button>
          {showSuccessMessage && <h1>{message}</h1>}

        </Col>
        <Col></Col>
      </Row>
    </>
  )
}
