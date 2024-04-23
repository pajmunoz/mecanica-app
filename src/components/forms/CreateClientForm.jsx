import { useState } from 'react';
import {Button, Form, InputGroup, Row, Col, Toast} from 'react-bootstrap';
import { Url } from '../../constant';
import { Link, useNavigate } from 'react-router-dom';
import PasswordGen from '../../tools/PasswordGen';

const CreateClientForm = () => {
  const password = PasswordGen()
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    tel: '',
    model: '',
    year: '',
    brand: '',
    plate: '',
    oil_date: '',
    user_id:localStorage.getItem('id'),
    username:'',
    password:'',
    notify: 0
  });
  const [show, setShow] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
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
      // Enviar datos al servidor para crear un nuevo cliente
      const response = await fetch(`${Url}/clients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData
        }),
      });
      const data = await response.json();

      setShowSuccessMessage(true);
      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      setTimeout(() => {
        navigate('/admin', { replace: true })

      }, 2000);

    } catch (error) {
      console.error('Error al crear el cliente:', error),
        handleMessage('Error al actualizar datos del cliente!')

    }
    handleMessage('Cliente Agregado Exitosamente!')
  };

  return (


    <>
      <Row>
        <Col></Col>
        <Col md='auto'>
          <h3 className='text-center mt-5'>
            Crear
            <small className="text-body-secondary"> Nuevo Cliente</small>
          </h3>
          <hr />
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
                aria-label="tel"
                aria-describedby="inputGroup-sizing-default"
                required type="phone" name="tel"  placeholder="2364 12 3456" value={formData.tel} onChange={handleChange}
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
                aria-label="Username"
                aria-describedby="inputGroup-sizing-default"
                required type="text" name="username" value={`${formData.name}${formData.lastname.charAt(0).toUpperCase()}${formData.lastname.slice(1)}`} onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Contraseña
              </InputGroup.Text>
              <Form.Control
                aria-label="Password"
                aria-describedby="inputGroup-sizing-default"
                required disabled type="text" name="password" value={password} onChange={handleChange}
              />
            </InputGroup>

            <Button className='w-100 my-2' variant='primary' type="submit">Guardar</Button>

          </form>
          <hr />
          <Link to={'/admin'}>
            <Button className='w-100 my-2' variant='secondary'>Cancelar</Button>
          </Link>

          {showSuccessMessage && (
            <Toast className='bg-success position-fixed top-50 start-50 translate-middle' onClose={() => setShow(false)} position="top-start" show={show} delay={3000} autohide>
              <Toast.Body className='text-white text-center'>{message} ✓</Toast.Body>
            </Toast>
          )}

        </Col>
        <Col></Col>
      </Row>


    </>
  );
};

export default CreateClientForm;
