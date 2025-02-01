import React, { useState } from 'react';  // Importa useState
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const FormLogin = () => {
  const [formInputs, setFormInputs] = useState({
    email: "",
    contrasenia: "",
  });

  const [usuarioInput, setUsuarioInput] = useState(false);
  const [contraseniaInput, setContraseniaInput] = useState(false);

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    
    if (name === "email") {
      setFormInputs({ ...formInputs, email: value });
      setUsuarioInput(value.length < 3 || value.length > 25);  // Validación de longitud de email
    } else if (name === "contrasenia") {
      setFormInputs({ ...formInputs, contrasenia: value });
      setContraseniaInput(value.length < 4 || value.length > 25);  // Validación de longitud de contraseña
    }
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    // Aquí puedes agregar la lógica para enviar el formulario
    console.log(formInputs);
  };

  return (
    <>
      <Container fluid style={{ background: "#FFFFFF" }}>
        <Row>
          <Col className="d-flex justify-content-center" sm={12} md={10} lg={10}>
            <Form className="p-5 text-center">
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Ingresar correo electrónico</Form.Label>
                <Form.Control
                  name="email"
                  onChange={handleChange}
                  value={formInputs.email}
                  className={
                    usuarioInput ? "form-control is-invalid" : "form-control"
                  }
                  type="email"
                  placeholder=""
                />
                {usuarioInput && (
                  <Form.Text className="text-danger">
                    El email debe tener entre 3 y  25 caracteres
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Ingresar contraseña</Form.Label>
                <Form.Control
                  name="contrasenia"
                  onChange={handleChange}
                  value={formInputs.contrasenia}
                  className={
                    contraseniaInput ? "form-control is-invalid" : "form-control"
                  }
                  type="password"
                  placeholder=""
                />
                {contraseniaInput && (
                  <Form.Text className="text-danger">
                    La contraseña debe tener entre 4 y 25 caracteres.
                  </Form.Text>
                )}
              </Form.Group>
              <Button
                style={{ background: "#000000", color: "#CCFF01" }}
                onClick={handleClick}
                type="submit"
              >
                Ingresar
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default FormLogin;
