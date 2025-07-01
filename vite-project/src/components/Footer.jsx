import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import '../css/style.css'
import { useLocation } from 'react-router-dom';

function Footer() {
  const location = useLocation();
  if (location.pathname === '/Error404') return null; // No muestra el footer en Error404
  return (
    <>
      <Container fluid className="estilosFooter" >
        <Row >
          <Col className="d-flex justify-content-center">
          </Col>
        </Row>
        <Row>
          <Col  xs={12} sm={6} md={3}>
            <div className="p-4">
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter"
                >
                  Información
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter"
                >
                  Ayuda
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter "                >
                  Sugerencias
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter"                >
                  Reclamos
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter"                >
                  Trabajá con nosotros
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="p-4">
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter"                >
                  Preguntas frecuentes
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4 estilosFooter"                >
                  Cómo comprar
                </Link>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} md={3}>
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4 estilosFooter"
              >
                Políticas de privacidad
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
