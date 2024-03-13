import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ErrorPage() {
  return (
  <>
  <Row>
    <Col></Col>
    <Col md='auto'>
    <h3 className='text-center mt-5'>
          Pagina no 
          <small className="text-body-secondary"> Encontrada </small>
        </h3>
    </Col>
    <Col></Col>
  </Row>
  </>
  )
}
