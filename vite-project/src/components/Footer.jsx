import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconoErizo from "../assets/IconoErizo.png";
import '../css/style.css'

function Footer() {
  return (
    <>
      <Container fluid className="estilosFooter" >
        <Row >
          <Col className="d-flex justify-content-center">
            <img src={IconoErizo} alt="" width="90px" height="90px" />
          </Col>
        </Row>
        <Row>
          <Col >
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
          <Col >
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
          <Col>
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4 estilosFooter"
              >
                Políticas de privacidad
              </Link>
            </div>
          </Col>
          <Col >
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4 estilosFooter"
              >
                Ubicación
              </Link>
            </div>
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4 estilosFooter"
              >                
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Footer;
