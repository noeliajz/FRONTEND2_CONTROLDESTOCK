import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const Navbar2 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('');
  const [token, setToken] = useState('');

  // Este useEffect se ejecuta cuando se monta el componente
  useEffect(() => {
    setRole(localStorage.getItem('role') || '');
    setToken(localStorage.getItem('token') || '');
  }, []);

  // Escucha cambios en localStorage y actualiza el estado automáticamente
  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem('role') || '');
      setToken(localStorage.getItem('token') || '');
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    setRole('');
    setToken('');
    navigate('/HomePage'); // Redirigir inmediatamente
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="colorNavbar">
      <Container>
        <Navbar.Brand className="colorLetrasNavbar fs-3" href="/">Control de stock</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {role === 'admin' && token ? (
              <>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/CrudProducts">Productos</Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/CrudUsers">Usuarios</Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : role === 'user' && token ? (
              <>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/AddProducts">Productos</Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" onClick={handleLogout}>Cerrar sesión</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Contact">Contacto</Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Quien">Quienes somos</Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Register">Registrarse</Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Login">Iniciar sesión</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navbar2;
