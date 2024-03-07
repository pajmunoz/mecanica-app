export default function EditClientForm({handleEdit}) {
  

  const handleCancel = async (e) => {
    window.location.replace('/admin')
  }
  return (
    <>
      <form onSubmit={handleEdit}>
        <input type="text" name="name" placeholder="Nombre" /><br />
        <input type="text" name="lastname" placeholder="Apellido" /><br />
        <input type="text" name="model" placeholder="Modelo" /><br />
        <input type="text" name="brand" placeholder="Marca" /><br />
        <input type="text" name="plate" placeholder="Placa" /><br />
        <input type="date" name="oil_date" placeholder="Ultimo cambio de aceite" /><br />
        <button type="submit">Guardar</button>
      </form>
      <button onClick={handleCancel}>Cancelar</button>
    </>
  )
}
