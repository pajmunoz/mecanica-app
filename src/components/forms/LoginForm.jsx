import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { Url } from '../../constant';

export default function LoginForm({ handleLogin, loggedUser }) {
  const [logging, setLogging] = useState(false)
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLogging(true)
    e.preventDefault();
    try {
      const response = await axios.post(`${Url}/login`, { username, password });
      setLogging(false)
      console.log(response.data); // Mensaje de éxito
      setIsAuthenticated(true);
      handleLogin(isAuthenticated)
      loggedUser(username)

      navigate('/admin');
    } catch (err) {
      setLogging(false)
      setError('Credenciales inválidas');

    }
  };

  return (
    <>
    <Row className='mt-5'>
    <Col></Col>
      <Col md="auto">
        {logging ? <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" /> : <>
        <h3 className='text-center'>
            MecanicApp
            <small className="text-body-secondary">Login</small>
          </h3>
          <hr />
          <form onSubmit={handleSubmit}  className='text-center' >
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default" >
                Usuario
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={username} onChange={(e) => setUsername(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Contraseña
              </InputGroup.Text>
              <Form.Control
                type='password'
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={password} onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroup>
            <Button variant="dark" type="submit">Iniciar sesión</Button>
            {error && <p>{error}</p>}
          </form>
        </>
        }
      </Col>
      <Col></Col>
      </Row>

    </>
  )

}
