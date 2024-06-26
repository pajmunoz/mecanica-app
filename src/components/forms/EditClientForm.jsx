import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button, Form, InputGroup, Row, Col, Spinner, Toast } from 'react-bootstrap';
import { Url } from '../../constant';

export default function EditClientForm() {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [cliente, setCliente] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    tel: '',
    model: '',
    year: '',
    brand: '',
    plate: '',
    oil_date: '',
    client_user:'',
    client_pass:''

  });


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
          tel: data.tel,
          model: data.model,
          year: data.year,
          brand: data.brand,
          plate: data.plate,
          oil_date: formatDate(data.oil_date),
          client_user:data.client_user,
          client_pass:data.client_pass

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
    setShow(true)
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
        navigate('/admin', { replace: true })

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
                  Teléfono
                </InputGroup.Text>
                <Form.Control
                  aria-label="Telefono"
                  aria-describedby="inputGroup-sizing-default"
                  required type="phone" name="tel" placeholder="2364 12 3456" value={formData.tel} onChange={handleChange}
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

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Usuario
                </InputGroup.Text>
                <Form.Control
                  aria-label="Placa"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="client_user" placeholder="OFS-224" value={formData.client_user} onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-default">
                  Contraseña
                </InputGroup.Text>
                <Form.Control
                  aria-label="Placa"
                  aria-describedby="inputGroup-sizing-default"
                  required type="text" name="client_pass" placeholder="OFS-224" value={formData.client_pass} onChange={handleChange}
                />
              </InputGroup>


              <Button className='w-100 my-2' variant='primary' type="submit">Actualizar</Button>
            </form>
          }

          <hr />
          <Link to='/admin'>
            <Button className='w-100 my-2' variant='secondary'>Cancelar</Button>
          </Link>
          {showSuccessMessage && (
            <Toast className='position-fixed top-50 start-50 translate-middle' bg='success' onClose={() => setShow(false)} position="top-start" show={show} delay={3000} autohide>
              <Toast.Body className='text-white text-center'>{message} ✓</Toast.Body>
            </Toast>
          )}
        </Col>
        <Col></Col>
      </Row>
    </>
  )
}
