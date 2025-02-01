import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import IconoErizo from "../assets/IconoErizo.png";

function Footer() {
  return (
    <>
      <Container fluid style={{ background: "#000000", height:"450px"}}>
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
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD", textDecoration:"none" }}
                >
                  Información
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none" }}
                >
                  Ayuda
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none" }}
                >
                  Sugerencias
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none" }}
                >
                  Reclamos
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none" }}
                >
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
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none"}}
                >
                  Preguntas frecuentes
                </Link>
              </div>
              <div>
                <Link
                  to="/Error404"
                  className="fs-4"
                  style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none" }}
                >
                  Cómo comprar
                </Link>
              </div>
            </div>
          </Col>
          <Col>
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4"
                style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none" }}
              >
                Políticas de privacidad
              </Link>
            </div>
          </Col>
          <Col >
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4"
                style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none"}}
              >
                Ubicación
              </Link>
            </div>
            <div className="p-4">
              <Link
                to="/Error404"
                className="fs-4"
                style={{ color: "#CCFF01", textShadow: "0 0 3px #9AC8CD" , textDecoration:"none"}}
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
