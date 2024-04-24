import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Form, Button, Row, Col, Spinner, InputGroup } from 'react-bootstrap';
import { Url } from '../../constant';

export default function LoginClient({ handleLogin, loggedUser }) {
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
            const response = await axios.post(`${Url}/clients/login`, { username, password });
            setLogging(false)
            //console.log(response.data); // Mensaje de éxito
            //console.log('ID', response.data.client_id)
            setIsAuthenticated(true);
            handleLogin(isAuthenticated)
            loggedUser(response.data.client_id, response.data.client_name, response.data.client_lastName, response.data.client_carBrand, response.data.client_carModel, response.data.client_carYear, response.data.client_carPlate, response.data.client_carOilDate)

            navigate('/client-page');
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
                {logging ? <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" /> : <>
                    <h3 className='text-center'>
                        MecanicApp
                        <small className="text-body-secondary"> Clientes</small>
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
                        {error && <p>{error}</p>}
                    </form>
                </>}</Col>
            <Col></Col>
        </Row>
    )
}
