import React, { useState, useEffect  } from 'react';
import { useParams } from 'react-router-dom';

export default function BookForm() {
  const { id } = useParams();
  const [visitDay, setVisitDay] = useState('');
  const [startHour, setStartHour] = useState('');
  const [duration, setDuration] = useState('');
  const [comment, setComment] = useState('');
  const [savedData, setSavedData] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCancel = async (e) => {
    window.location.replace('/admin')
  }

  useEffect(() => {
    fetchUserAppointments();
  }, []); // Se ejecuta solo una vez al cargar el componente

  const fetchUserAppointments = async () => {
    try {
      setLoading(true); 
      const response = await fetch(`http://localhost:4000/clientes/${id}/citas`);
      if (!response.ok) {
        throw new Error('Error al obtener citas del usuario');
      }
      const data = await response.json();
      setUserAppointments(data);
    } catch (error) {
      console.error('Error:', error);
    }finally {
      setLoading(false); // Desactivar loader al completar la carga de citas
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    try {
      const response = await fetch(`http://localhost:4000/citas/${appointmentId}`, {
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
      const response = await fetch('http://localhost:4000/guardar-cita', {
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

  return (<>
  {loading ? <div>Loading...</div>:
  
  <>
  <h1>{id}</h1>
  <form onSubmit={handleSubmit}>
    <label htmlFor='fechaVisita'>Dia de visita</label><br />
    <input type="date" name="visit_day" id="fechaVisita" value={visitDay} onChange={(e) => setVisitDay(e.target.value)} required /><br />
    <label htmlFor='horaInicio'>Hora Inicio</label><br />
    <input type="time" name="start_hour" id="horaInicio" value={startHour} onChange={(e) => setStartHour(e.target.value)} /><br />
    <label htmlFor='duracion'>Duración en horas:</label><br />
    <input type="number" min="0.5" max="24" step=".5" name="duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} /><br />
    <textarea name="postContent" rows={4} cols={40} placeholder="Añade un comentario" value={comment} onChange={(e) => setComment(e.target.value)} /><br />
    <button type='submit'>Enviar</button>
  </form>
  <button onClick={handleCancel}>Cancelar</button>
  {savedData && (
    <div>
      {/* Mostrar datos guardados */}
    </div>
  )}

  <h2>Citas del Usuario:</h2>
  <ul>
    {userAppointments.map((appointment) => (
      <li key={appointment.id}>
        {/* Mostrar información de cada cita */}
        <p>Día de visita: {appointment.visit_day}</p>
        <p>Hora de inicio: {appointment.start_hour}</p>
        <p>Duración: {appointment.duration} horas</p>
        <p>Comentario: {appointment.comment}</p>
        <button onClick={() => handleDeleteAppointment(appointment.id)}>Eliminar</button>
      </li>
    ))}
  </ul>

</>

  }
  </>
   
  );
}
