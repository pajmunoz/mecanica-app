export default function ClientList({data}) {

  const handleEditUser = (userId) => {
    // Guardar el ID del usuario que se está editando en el estado local
    console.log('hi')
    //setEditingUserId(userId);
    // Aquí puedes implementar la lógica para abrir un formulario de edición o cualquier otra interfaz de usuario
    window.location = `/edit/${data.id}`
};

  return (
    <>
      <ul>
        <li>id {data.id}</li>
        <li>Nombre: {data.name}</li>
        <li>Apellido: {data.lastName}</li>
        <li>Correo:  {data.email}</li>
        <li>Marca:{data.brand}</li>
        <li>Modelo: {data.model}</li>
        <li>Año: {data.year}</li>
        <li>Placa: {data.plate}</li>
        <li>Ultimo cambio de aceite: {data.oil_date}</li>
        <li>Notificar: { <input type="checkbox" checked={data.notify} readOnly></input>}</li>
        <button onClick={() => window.location = '/book'}>Agregar Cita</button>
        <button onClick={handleEditUser}>Editar</button>

      </ul>
    </>
  )
}
