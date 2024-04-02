import React, { useState, useEffect } from 'react';
import ClientList from "../lists/ClientList"
import { Row, Col, Button, Spinner, Pagination } from 'react-bootstrap';
import { Url } from '../../constant';
import { Link } from 'react-router-dom';
import SearchClient from '../forms/SearchForm';

export default function AdminPage({ handleLogout, username }) {
  const [loading, setLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clientsPerPage] = useState(4);
  const [currentClients, setCurrentClients] = useState([]);
  const [recentClients, setRecentClients] = useState([]);
  const [clientCount, setClientCount] = useState(0);
  const totalPages = Math.ceil(clientCount / clientsPerPage);

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
        setClientCount(sortedData.length);
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

  const handleSearch = (searchTerm) => {
    const filteredClients = clientes.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.lastname.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.plate.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setCurrentClients(filteredClients);
    setClientCount(filteredClients.length);
  };

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
      setClientCount(currentClientCount => currentClientCount - 1);
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
      </Row>
      <Row>
        <Col>
          <Button variant="secondary" onClick={handleLogout}>Cerrar Sesion</Button>
        </Col>
      </Row>

      <SearchClient handleSearch={handleSearch} />



      <Row className='mt-5'>
        <Col><h5>Lista de Clientes</h5> <span>Clientes mostrados: {clientCount}</span></Col>
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
          <div className="border border-secondary-subtle p-3 bg-secondary-subtle">
            {currentClients.length > 0 ? currentClients.map((client, index) => (
              <ClientList key={index} data={client} onDelete={handleDeleteClient} index={index} />
            )) : 'No hay resultados para mostrar.'}
          </div>
          {totalPages > 1 && currentClients.length >= clientsPerPage - 1 && (
            <Pagination className='mt-3'>
              <Pagination.Prev onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1} />
              {[...Array(totalPages).keys()].map((num) => (
                <Pagination.Item key={num + 1} active={num + 1 === currentPage} onClick={() => setCurrentPage(num + 1)}>
                  {num + 1}
                </Pagination.Item>
              ))}
              <Pagination.Next onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages} />
            </Pagination>
          )}
        </>

      )}

      <h5 className='mt-5'>Clientes agregados recientemente</h5>
      <hr />
      {loading ? (
        <Spinner className='position-absolute top-50 start-50 translate-middle' animation="grow" variant="dark" />
      ) : (
        <>
          <div className="border border-secondary-subtle p-3 bg-secondary-subtle">
            {recentClients.length > 0 ? recentClients.map((client, index) => (
              <ClientList key={index} data={client} onDelete={handleDeleteClient} index={index} />
            )) : 'No hay resultados para mostrar.'}
          </div>
        </>
      )}
    </>
  )
}
