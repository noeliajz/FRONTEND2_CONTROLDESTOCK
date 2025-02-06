import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate} from 'react-router-dom'

const Navbar2 = () => {
  // Recuperar valores de localStorage solo al inicio (sin necesidad de efecto).
  const [role, setRole] = useState(localStorage.getItem('role') || '');
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const navigate = useNavigate()

  const handleLogout = () => {
    // Eliminar los datos de localStorage cuando el usuario cierre sesión
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setRole('');
    setToken('');
    setTimeout(() => {
      navigate('/')
    }, 1000);
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">Control de stock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* Cambio de página dependiendo del role */}
            <Nav.Link href={role === 'admin' ? '/CrudProducts' : role === 'user' ? '/UserPage' : '/'}>Inicio</Nav.Link>

            {/* Mostrar enlaces de admin si está autenticado como admin */}
            {token && role === 'admin' && (
              <>
                <Nav.Link href="/CrudProducts">Productos</Nav.Link>
                <Nav.Link href="/CrudUsers">Usuarios</Nav.Link>
              </>
            )}

            {/* Mostrar enlaces si no es admin (usuario normal) */}
            {!token || role !== 'admin' ? (
              <>
                <Nav.Link href="#pricing">Quienes somos</Nav.Link>
                <Nav.Link href="#pricing">Contacto</Nav.Link>
              </>
            ) : null}

            {/* Mostrar opciones de registro/login si no está autenticado */}
            {!token ? (
              <>
                <Nav.Link href="/Register">Registro</Nav.Link>
                <Nav.Link href="/Login">Login</Nav.Link>
              </>
            ) : (
              // Si está autenticado, mostrar la opción para cerrar sesión
              <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;
