import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'
import '../css/style.css'

const Navbar2 = () => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setRole('');
    setToken('');
    setTimeout(() => {
      navigate('/')
    }, 1000);
  };

  return (
    <Navbar collapseOnSelect expand="lg"  className="colorNavbar">
      <Container>
        <Navbar.Brand className="colorLetrasNavbar fs-3" href="/">Control de stock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="colorLetrasNavbar fs-4" href={role === 'admin' ? '/CrudProducts' : role === 'user' ? '/UserPage' : '/'}>Inicio</Nav.Link>

            {token && role === 'admin' && (
              <>
                <Nav.Link  className='colorLetrasNavbar fs-4' href="/CrudProducts">Productos</Nav.Link>
                <Nav.Link  className='colorLetrasNavbar fs-4' href="/CrudUsers">Usuarios</Nav.Link>
              </>
            )}

            {!token || role !== 'admin' ? (
              <>
                <Nav.Link className='colorLetrasNavbar linkColorMenu fs-4' href="/Quien">Quienes somos</Nav.Link>
                <Nav.Link className='colorLetrasNavbar fs-4' href="/Contacto">Contacto</Nav.Link>
              </>
            ) : null}

            {!token ? (
              <>
                <Nav.Link className='colorLetrasNavbar fs-4' href="/Login">Login</Nav.Link>
                <Nav.Link className='colorLetrasNavbar fs-4' href="/Register">Registro</Nav.Link>
              </>
            ) : (
              <Nav.Link className="colorLetrasNavbar fs-4" onClick={handleLogout}>Cerrar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;
