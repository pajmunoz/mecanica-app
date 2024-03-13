import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Url } from '../../constant';

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
      const response = await fetch(`${Url}:4000/clientes`, {
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
                required type="text" name="lastName" placeholder="Perez" value={formData.lastName} onChange={handleChange}
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
          <hr />
          <Button className='w-100 my-2' variant='secondary' onClick={() => window.location = '/admin'}>Cancelar</Button>
          {showSuccessMessage && <h1>{message}</h1>}

        </Col>
        <Col></Col>
      </Row>


    </>
  );
};

export default CreateClientForm;
