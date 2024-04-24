import ListGroup from 'react-bootstrap/ListGroup';

export default function ContactPage() {
  const data = {
    desc: "Nos especializamos en dar soluciones de software a pequeña y mediana empresa de Junín, Provincia de Buenos Aires",
  }
  return (
    <>
      <h3 className="text-center my-5">Somos<small className="text-body-secondary"> Hara Software</small></h3>
      <ListGroup>
        <ListGroup.Item>{data.desc}</ListGroup.Item>
        <br />
        <ListGroup.Item><h5>Tenemos experiencia en:</h5> </ListGroup.Item>
        <ListGroup.Item disabled>Front end  con React, Next.js.</ListGroup.Item>
        <ListGroup.Item disabled>Backend, base de datos y deployment con Postgres, mySQL, Mongo, Node, Vercel y Express.</ListGroup.Item>
        <ListGroup.Item disabled>Diseño de imagen y posicionamiento web</ListGroup.Item>
        <ListGroup.Item disabled>Gestion de datos y dominio</ListGroup.Item>
      </ListGroup>

    </>
  )
}
