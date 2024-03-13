import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import { Url } from '../../constant';

export default function BookForm() {
  const { id } = useParams();
  const [visitDay, setVisitDay] = useState('');
  const [startHour, setStartHour] = useState('');
  const [duration, setDuration] = useState('');
  const [comment, setComment] = useState('');
  const [savedData, setSavedData] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(false);


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleCancel = async (e) => {
    window.location.replace('/admin')
  }

  useEffect(() => {
    fetchUserAppointments();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const fetchUserAppointments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${Url}/clientes/${id}/citas`);
      if (!response.ok) {
        throw new Error('Error al obtener citas del usuario');
      }
      const data = await response.json();
      setUserAppointments(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); // Desactivar loader al completar la carga de citas
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`${Url}/citas/${appointmentId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Error al eliminar la cita');
      }
      // Actualizar la lista de citas después de la eliminación
      fetchUserAppointments();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Url}/guardar-cita`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          client_id: id,
          visit_day: visitDay,
          start_hour: startHour,
          duration: duration,
          comment: comment,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al guardar los datos');
      }

      const data = await response.json();
      console.log(data);
      setSavedData(data.data);
      fetchUserAppointments(); // Actualizar la lista de citas después de guardar una nueva cita
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <Row>
        <Col></Col>
        <Col md='auto'>
          <h3 className='text-center mt-5'>
            Nueva
            <small className="text-body-secondary"> Visita</small>
          </h3>
          <hr />
          <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Fecha de Visita
              </InputGroup.Text>
              <Form.Control
                aria-label="Fecha de Visita"
                aria-describedby="inputGroup-sizing-default"
                type="date" name="visit_day" id="fechaVisita" value={visitDay} onChange={(e) => setVisitDay(e.target.value)} required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Hora de Inicio
              </InputGroup.Text>
              <Form.Control
                aria-label="Hora de Inicio"
                aria-describedby="inputGroup-sizing-default"
                type="time" name="start_hour" id="horaInicio" value={startHour} onChange={(e) => setStartHour(e.target.value)} required
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Duración
              </InputGroup.Text>
              <Form.Control
                aria-label="Duración"
                aria-describedby="inputGroup-sizing-default"
                type="number" min="0.5" max="24" step=".5" name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} required
              />
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>Notas</InputGroup.Text>
              <Form.Control as="textarea" aria-label="Notas" value={comment} onChange={(e) => setComment(e.target.value)} name="postContent" rows={4} cols={40} />
            </InputGroup>
            <hr />
            <Button className='w-100' type='submit'>Crear Nueva</Button>
          </form>
          <Button className='w-100 mt-2' variant='secondary' onClick={handleCancel}>Volver</Button>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <h3 className='text-center mt-5'>
          Lista de 
          <small className="text-body-secondary"> Visitas Guardadas</small>
        </h3>
        <hr />
        {loading ? <Spinner className='text-center' animation="grow" variant="dark" />: <>

          <ul>
            {userAppointments.length<1 ? <p className='text-center text-secondary'>No hay visitas</p>: 
            userAppointments.map((appointment) => (
              <Table key={appointment.id} responsive striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Día de visita</th>
                    <th>Hora de inicio</th>
                    <th>Duración</th>
                    <th>Comentario</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody >
                  <tr>
                    <td>{appointment.id}</td>
                    <td>{formatDate(appointment.visit_day)}</td>
                    <td>{appointment.start_hour}</td>
                    <td>{appointment.duration} horas</td>
                    <td>{appointment.comment}</td>
                    <td className='text-center'> <Button variant='danger' onClick={() => handleDeleteAppointment(appointment.id)}>Eliminar</Button></td>
                  </tr>
                </tbody>
              </Table>
            ))}
          </ul>

        </>

        }
      </Row>
    </>

  );
}
