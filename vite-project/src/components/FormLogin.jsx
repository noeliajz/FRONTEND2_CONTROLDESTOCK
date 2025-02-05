import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const FormLogin = () => {
  const [formInputs, setFormInputs] = useState({
    usuario: "",
    contrasenia: "",
  });

  const [errores, setErrores] = useState({
    usuario: "",
    contrasenia: "",
  });

  // Expresión regular para validar email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    if (value.length > 25) return; // Evita que se ingresen más de 25 caracteres

    setFormInputs({ ...formInputs, [name]: value });

    if (name === "usuario") {
      setErrores({
        ...errores,
        usuario: 
          value.length < 3
            ? "El usuario debe tener al menos 3 caracteres."
            : !emailRegex.test(value)
            ? "Debe ingresar un email válido."
            : "",
      });
    }

    if (name === "contrasenia") {
      setErrores({
        ...errores,
        contrasenia:
          value.length < 4
            ? "La contraseña debe tener al menos 4 caracteres."
            : "",
      });
    }
  };

  const handleClick = (ev) => {
    ev.preventDefault();

    if (!formInputs.usuario.trim() || !formInputs.contrasenia.trim()) {
      setErrores({
        usuario: !formInputs.usuario.trim() ? "El usuario es obligatorio." : "",
        contrasenia: !formInputs.contrasenia.trim()
          ? "La contraseña es obligatoria."
          : "",
      });
      return;
    }

    if (!emailRegex.test(formInputs.usuario)) {
      setErrores((prev) => ({
        ...prev,
        usuario: "Debe ingresar un email válido.",
      }));
      return;
    }

    console.log("Datos enviados:", formInputs);
  };

  return (
    <Container fluid style={{ background: "#FFFFFF" }}>
      <Row>
        <Col className="d-flex justify-content-center" sm={12} md={10} lg={10}>
          <Form className="p-5 text-center">
            <Form.Group className="mb-3" controlId="formBasicUsuario">
              <Form.Label>Ingresar email</Form.Label>
              <Form.Control
                name="usuario"
                value={formInputs.usuario}
                onChange={handleChange}
                className={errores.usuario ? "form-control is-invalid" : "form-control"}
                type="email"
                maxLength={25}
                placeholder="Ingrese su correo electrónico"
              />
              {errores.usuario && (
                <Form.Text className="text-danger">{errores.usuario}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Ingresar contraseña</Form.Label>
              <Form.Control
                name="contrasenia"
                value={formInputs.contrasenia}
                onChange={handleChange}
                className={errores.contrasenia ? "form-control is-invalid" : "form-control"}
                type="password"
                maxLength={25}
                placeholder="Ingrese su contraseña"
              />
              {errores.contrasenia && (
                <Form.Text className="text-danger">{errores.contrasenia}</Form.Text>
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
  );
};

export default FormLogin;
