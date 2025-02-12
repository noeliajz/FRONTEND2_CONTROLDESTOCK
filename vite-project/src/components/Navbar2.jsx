import React, { useState, useEffect, cloneElement } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate } from 'react-router-dom';
import '../css/style.css';

const Navbar2 = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role') ?? '');
  const [ token, setToken] = useState(localStorage.getItem('token') ?? '');
  useEffect(() => {
    const updateUserState = () => {
      setRole(localStorage.getItem('role') ?? '' );
      setToken(localStorage.getItem('token') ?? '' );

    };
    window.addEventListener('storage', updateUserState)  
    return  () => {
      window.removeEventListener('storage', updateUserState)
    } 
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    setRole('');
    navigate('/');
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="colorNavbar">
      <Container>
        <Navbar.Brand className="colorLetrasNavbar fs-3" href="/">
          Control de stock
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {token ? (
              role === 'admin' ? (
                <>
                  <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/CrudProducts">
                    Productos
                  </Nav.Link>
                  <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/CrudUsers">
                    Usuarios
                  </Nav.Link>
                  <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" onClick={handleLogout}>
                    Cerrar sesión
                  </Nav.Link>
                </>
              ) : role === 'user' ? (
                <>
                  <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/AddProducts">
                    Productos
                  </Nav.Link>
                  <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" onClick={handleLogout}>
                    Cerrar sesión
                  </Nav.Link>
                </>
              ) : null
            ) : (
              <>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/">
                  Inicio
                </Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Contacto">
                  Contacto
                </Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Quien">
                  Quienes somos
                </Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Register">
                  Registrarse
                </Nav.Link>
                <Nav.Link className="colorLetrasNavbar fs-4 linkColorMenu" href="/Login">
                  Iniciar sesión
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navbar2;