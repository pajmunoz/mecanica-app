import React, { useState, useEffect } from 'react';
import ClientList from "../lists/ClientList"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { Url } from '../../constant';
import { Link } from 'react-router-dom';

export default function AdminPage({ handleLogout, username }) {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);

  // Función para obtener los datos del servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Url}/clients`);
        const data = await response.json();
        setClientes(data);
        setLoading(false); // Cambiar estado a false después de cargar los datos
      } catch (error) {
        console.error('Error al obtener datos del servidor:', error);
        setLoading(false); // Cambiar estado a false en caso de error también
      }
    };

    fetchData();
  }, []); // Se ejecuta solo una vez al montar el componente

  const handleDeleteClient = async (clientId) => {
    try {
      const response = await fetch(`${Url}/clients/${clientId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar cliente');
      }
      // Actualizar la lista de clientes después de eliminar el cliente
      const updatedClientes = clientes.filter(cliente => cliente.id !== clientId);
      setClientes(updatedClientes);
      setLoading(false);
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      setLoading(false);
      // Mostrar mensaje de error al usuario u otra acción necesaria
    }
  };

  return (

    <>
      <Row className='mt-5'>
        <Col>
          <h3>
            Bienvenido
            <small className="text-body-secondary"> {username}</small>
          </h3>
        </Col>
        <Col></Col>
        <Col className='text-end' md="auto">
          <Row>

            <Col>
              <Button variant="secondary" onClick={handleLogout}>Cerrar Sesion</Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <p>Notificaciones</p>
      <Row>
        <Col>
          <h4>Lista de Clientes</h4>
        </Col>
        <Col className='text-end'>
          <Link to={'/createClient'}>
            <Button variant="primary">
              Nuevo cliente (+)
            </Button>
          </Link>

        </Col>
      </Row>

      <hr />
      {loading ? (
        <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" />
      ) : (
        <>
          <div className="client-container border border-secondary-subtle p-3 bg-secondary-subtle">
            {clientes.map((client, index) => (

              <ClientList key={index} data={client} onDelete={handleDeleteClient} index={index} />

            ))}
          </div>
        </>

      )}
    </>
  )
}
