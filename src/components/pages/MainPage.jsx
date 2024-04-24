import { Link } from 'react-router-dom';
import { Row, Col, Button } from 'react-bootstrap';


export default function MainPage() {
  return (
    <>
      <Row className='mt-5'>
        <Col></Col>
        <Col md='auto' className='text-center mh-100' >
          <figure className=' mx-auto'>
            <img className='w-100' src={'https://picsum.photos/1024/200.webp?random=1'} alt="" />
          </figure>

          <h3>
            MecanicApp
            <small className="text-body-secondary"> Gestiona fácil</small>
          </h3>
          <hr />
          <Link to="/login">
            <Button variant="dark">Iniciar Sesión</Button>
          </Link>

        </Col>
        <Col></Col>

      </Row>
    </>


  )
}
