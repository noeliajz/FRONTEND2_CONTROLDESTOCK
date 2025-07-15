import React from "react";
import { Link, useLocation } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/style.css';

function Footer() {
  const location = useLocation();

  if (location.pathname === '/Error404') return null;

  return (
    <footer className="footer estilosFooter">
      <Container fluid>
        <Row>
          <Col xs={12} sm={6} md={3}>
            <div className="p-4">
              <Link to="/Error404" className="fs-4 footer-link">Información</Link>
              <Link to="/Error404" className="fs-4 footer-link">Ayuda</Link>
              <Link to="/Error404" className="fs-4 footer-link">Sugerencias</Link>
              <Link to="/Error404" className="fs-4 footer-link">Reclamos</Link>
              <Link to="/Error404" className="fs-4 footer-link">Trabajá con nosotros</Link>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="p-4">
              <Link to="/Error404" className="fs-4 footer-link">Preguntas frecuentes</Link>
              <Link to="/Error404" className="fs-4 footer-link">Cómo comprar</Link>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="pt-4 px-4">
              <Link to="/Error404" className="fs-4 footer-link">Políticas de privacidad</Link>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
