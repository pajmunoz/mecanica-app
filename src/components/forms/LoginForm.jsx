import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import { Url } from '../../constant';
import img from '../../assets/user.gif';

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
      //console.log(response.data); // Mensaje de éxito
      //console.log('ID', response.data.user_id)
      setIsAuthenticated(true);
      handleLogin(isAuthenticated)
      loggedUser(response.data.user_name, response.data.user_id)

      navigate('/admin');
    } catch (err) {
      setLogging(false)
      setError('Credenciales inválidas');

      // Reset the state on error
      setIsAuthenticated(false);
      handleLogin(false);
      loggedUser('');
      setUsername('');
      setPassword('');
    }
  };

  return (
    <Row className='mt-5'>

      <Col></Col>
      <Col md="auto">
        <figure className=' mx-auto'>
          <img className='w-100' src={img} alt="" />
          
        </figure>
        {logging ? <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" /> : <>
          <h3 className='text-center'>
            MecanicApp
            <small className="text-body-secondary"> Técnico</small>
          </h3>
          <hr />
          <form onSubmit={handleSubmit} className='text-center'>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Usuario
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={username} onChange={(e) => setUsername(e.target.value)}
                required
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
                required
              />
            </InputGroup>
            <Button variant="dark" type="submit">Iniciar sesión</Button>
            <hr />
            <span>Sos cliente? - <Link to={'/client-login'}>Inicia sesión</Link> </span>
            {error && <p>{error}</p>}
          </form>
        </>}</Col>
      <Col></Col>
    </Row>
  );
}