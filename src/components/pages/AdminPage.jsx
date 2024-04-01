import React, { useState, useEffect } from 'react';
import ClientList from "../lists/ClientList"
import { Row, Col, Button, Spinner, Pagination } from 'react-bootstrap';
import { Url } from '../../constant';
import { Link } from 'react-router-dom';

export default function AdminPage({ handleLogout, username }) {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(5);
  const [currentClients, setCurrentClients] = useState([]);
  const [recentClients, setRecentClients] = useState([]);

  useEffect(() => {
    const indexOfLastClient = currentPage * clientsPerPage;
    const indexOfFirstClient = indexOfLastClient - clientsPerPage;
    const displayedClients = clientes.slice(indexOfFirstClient, indexOfLastClient);
    setCurrentClients(displayedClients);
  }, [currentPage, clientsPerPage, clientes]);

  // Función para obtener los datos del servidor
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${Url}/clients`);
        const data = await response.json();
        const sortedData = data.sort((a, b) => a.id - b.id);
        setClientes(sortedData);

        const lastAddedClients = sortedData.slice(-2).reverse();
        setRecentClients(lastAddedClients);

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

          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="secondary" onClick={handleLogout}>Cerrar Sesion</Button>
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
      <h5>Clientes agregados recientemente</h5>
      {loading ? (
        <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" />
      ) : (
        <>
          <div className="border border-secondary-subtle p-3 bg-secondary-subtle">
            {recentClients.map((client, index) => (
              <ClientList key={index} data={client} onDelete={handleDeleteClient} index={index} />
            ))}
          </div>

        </>

      )}
      <hr />
      <h5>Lista de Clientes</h5>
      {loading ? (
        <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" />
      ) : (
        <>
          <div className="border border-secondary-subtle p-3 bg-secondary-subtle">
            {currentClients.map((client, index) => (
              <ClientList key={index} data={client} onDelete={handleDeleteClient} index={index} />
            ))}
          </div>
          <Pagination className='mt-5'>
            <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(Math.ceil(clientes.length / clientsPerPage)).keys()].map((num) => (
              <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => setCurrentPage(num + 1)}>
                {num + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(clientes.length / clientsPerPage)} />
          </Pagination>
        </>

      )}
    </>
  )
}
