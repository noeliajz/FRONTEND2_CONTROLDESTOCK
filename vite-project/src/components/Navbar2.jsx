import React, { useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../css/style.css';
import icono from "../assets/icono.png";

function Navbar2({Login, LoginAuth, auth}) {
  const navigate = useNavigate();
  const { token, role, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="colorNavbar">
      <Container>
        <Navbar.Brand as={Link} to="/" className="colorLetrasNavbar fs-3">
          <img src={icono} alt="" className='estiloIcono'/>Control de stock
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token && role === 'admin' && (
              <>
                <Nav.Link as={Link} to="/CrudProducts" className="colorLetrasNavbar fs-4 linkColorMenu">
                  Productos
                </Nav.Link>
                <Nav.Link as={Link} to="/CrudUsers" className="colorLetrasNavbar fs-4 linkColorMenu">
                  Usuarios
                </Nav.Link>
              </>
            )}

            {token && role === 'user' && (
              <>
                <Nav.Link as={Link} to="/AddProducts" className="colorLetrasNavbar fs-4 linkColorMenu">
                  Productos
                </Nav.Link>
              </>
            )}
          </Nav>

          <Nav>
            {token ? (
              <Nav.Link className="colorLetrasNavbar fs-4" onClick={handleLogout}>
                Cerrar sesión
              </Nav.Link>
            ) : (
              <>
                <Nav.Link as={Link} to="/Quien" className="colorLetrasNavbar fs-4">Quien soy</Nav.Link>
                <Nav.Link as={Link} to="/Contacto" className="colorLetrasNavbar fs-4">Contacto</Nav.Link>
                <Nav.Link as={Link} to="/Login" className="colorLetrasNavbar fs-4">Login</Nav.Link>
                <Nav.Link as={Link} to="/Register" className="colorLetrasNavbar fs-4">Registro</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbar2;
