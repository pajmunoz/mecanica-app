import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from '../../assets/logo-fede.png'


export default function MainPage() {
  return (
    <>
      <Row className='mt-5'>
        <Col></Col>
        <Col md='auto'  className='text-center mh-100' >
          <figure className='w-50 mx-auto'>
            <img className='w-100' src={logo} alt="" />
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
