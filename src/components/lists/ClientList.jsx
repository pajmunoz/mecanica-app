import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'  
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

export default function ClientList({ data, onDelete }) {
  const navigate = useNavigate()
  const [citaCount, setCitaCount] = useState(0);
  const handleEditUser = (userId) => {
    // Guardar el ID del usuario que se está editando en el estado local
    console.log('hi')
    //setEditingUserId(userId);
    // Aquí puedes implementar la lógica para abrir un formulario de edición o cualquier otra interfaz de usuario
    window.location = `/edit/${data.id}`
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDelete = () => {
    onDelete(data.id);
    console.log('delete')
  }



  useEffect(() => {
    if (data) {
      fetchCitaCount();
    }
  }, [data]); // Se ejecuta cuando 'data' cambia

  const fetchCitaCount = async () => {
    try {
      const response = await fetch(`http://localhost:4000/clientes/${data.id}/citas/count`);
      if (!response.ok) {
        throw new Error('Error al obtener cantidad de citas');
      }
      const responseData = await response.json();
      setCitaCount(responseData.citaCount);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Card className='my-1 p-1'>
        <Card.Body>
          <Row>
            <Col>
              <Table responsive striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>id</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Correo</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Placa</th>
                    <th>Fecha aceite</th>
                    <th>Notificar</th>
                    <th># de Citas</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.lastName}</td>
                    <td>{data.email}</td>
                    <td>{data.brand}</td>
                    <td>{data.model}</td>
                    <td>{data.year}</td>
                    <td>{data.plate}</td>
                    <td>{formatDate(data.oil_date)}</td>
                    <td>{<input type="checkbox" checked={data.notify} readOnly></input>}</td>
                    {data && (
                      <td>{citaCount}</td>
                    )}

                  </tr>


                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
      
            <Col md='auto'>
              <Row>

                <Col>
                  
                  <Button type='button'  variant='primary' onClick={() => navigate(`/book/${data.id}`)}>Visitas</Button>
             
                </Col>
                <Col>
                  <Button variant='success' onClick={handleEditUser}>Editar</Button>
                </Col>
                <Col>
                  <Button variant='danger' onClick={handleDelete}>Borrar</Button>
                </Col>
              </Row>



            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>

  )
}
