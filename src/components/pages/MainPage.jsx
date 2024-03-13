import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MainPage() {
  return (
    <>
      <Row className='mt-5 position-absolute top-50 start-50 translate-middle'>
        <Col></Col>
        <Col md='auto'  className='text-center' >

          <h3>
            MecanicApp
            <small className="text-body-secondary"> Gestiona fácil</small>
          </h3>
          <hr />
          <Button variant="dark" onClick={() => window.location = '/login'}>Iniciar Sesión</Button>

        </Col>
        <Col></Col>

      </Row>
    </>


  )
}
