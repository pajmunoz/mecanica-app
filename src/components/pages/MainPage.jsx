import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MainPage() {
  return (
    <>
      <Row className='mt-5'>
        <Col></Col>
        <Col md='auto'  className='text-center' >

          <h3>
            MecanicApp
            <small className="text-body-secondary">Gestiona fácil</small>
          </h3>
          <Button variant="dark" onClick={() => window.location = '/login'}>Login</Button>

        </Col>
        <Col></Col>

      </Row>
    </>


  )
}
