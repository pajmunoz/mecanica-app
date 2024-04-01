import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
export default function Header({ isAuthenticated }) {
  return (
    <>

      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container>
          {isAuthenticated ? <Navbar.Brand as={NavLink} to="/admin">MecanicApp</Navbar.Brand> : <Navbar.Brand as={NavLink} to="/">MecanicApp</Navbar.Brand>}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? <Nav.Link as={NavLink} to="/admin">Home</Nav.Link> : <Nav.Link as={NavLink} to="/">Home</Nav.Link>}
              {isAuthenticated ? null : <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}
              <Nav.Link as={NavLink} to="/contact">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}
