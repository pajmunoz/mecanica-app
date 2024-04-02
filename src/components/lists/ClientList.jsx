import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {Table, Button, Row, Col, Card} from 'react-bootstrap';
import { Url } from '../../constant';

export default function ClientList({ data, onDelete, index }) {
  const navigate = useNavigate()
  const [citaCount, setCitaCount] = useState(0);
  const handleEditUser = (userId) => {
    // Guardar el ID del usuario que se está editando en el estado local
    //setEditingUserId(userId);
    // Aquí puedes implementar la lógica para abrir un formulario de edición o cualquier otra interfaz de usuario
    navigate(`/edit/${data.id}`, { replace: true })
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleDelete = () => {
    onDelete(data.id);
  }

  useEffect(() => {
    if (data) {
      fetchCitaCount();
    }
  }, [data]); // Se ejecuta cuando 'data' cambia

  const fetchCitaCount = async () => {
    try {
      const response = await fetch(`${Url}/clients/${data.id}/appointment/count`);
      if (!response.ok) {
        throw new Error('Error al obtener cantidad de citas');
      }
      const responseData = await response.json();
      //console.log(response)
      setCitaCount(responseData);


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
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Teléfono</th>
                    <th>Marca</th>
                    <th>Modelo</th>
                    <th>Año</th>
                    <th>Placa</th>
                    <th>Fecha aceite</th>
                    <th>Visitas</th>

                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.lastname}</td>
                    <td>{data.tel}</td>
                    <td>{data.brand}</td>
                    <td>{data.model}</td>
                    <td>{data.year}</td>
                    <td>{data.plate}</td>
                    <td>{formatDate(data.oil_date)}</td>
                    {data && (
                      <td>{citaCount.appointment_count}</td>

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

                  <Button type='button' variant='primary' onClick={() => navigate(`/book/${data.id}`)}>Visitas</Button>

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
