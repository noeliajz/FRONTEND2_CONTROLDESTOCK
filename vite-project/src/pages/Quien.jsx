import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { Link } from "react-router-dom";
import foto from "../assets/foto.jpeg"

const Quien = () => {
  return (
    <>
     <Container fluid>
        <Row className="text-center">
          <Col sm={12} md={9} lg={12}>
          <img src={foto} alt="" className="imagen my-5"/>
            <h3>Contacto:</h3>
            <h4>Linkedin:</h4>
            <Link to="www.linkedin.com/in/zelayanoeliajudith">
              www.linkedin.com/in/zelayanoeliajudith
            </Link>
            <h3>Github:</h3>
            <Link to="https://github.com/noeliajz">
              https://github.com/noeliajz
            </Link>
          </Col>
        </Row>
      </Container> 
    </>
  )
}

export default Quien
