import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const NewUser = () => {
  const [formData, setFormData] = useState({
    nombres: "",
    apellidos: "",
    usuario: "",
    contrasenia: "",
  });

  const [errors, setErrors] = useState({
    nombres: "",
    apellidos: "",
    usuario: "",
    contrasenia: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      return "Este campo es obligatorio";
    }

    switch (name) {
      case "nombres":
      case "apellidos":
        if (value.length < 3 || value.length > 25) {
          error = "Debe tener entre 3 y 25 caracteres";
        }
        break;

      case "usuario":
        if (!/^\S+@\S+\.\S+$/.test(value) || value.length < 3 || value.length > 25) {
          error = "Debe ser un email válido y tener entre 3 y 25 caracteres";
        }
        break;

      case "contrasenia":
        if (value.length < 4 || value.length > 25) {
          error = "Debe tener entre 4 y 25 caracteres";
        }
        break;

      default:
        break;
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (value.length > 25) return;

    setFormData({ ...formData, [name]: value });

    const errorMessage = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      const errorMessage = validateField(key, formData[key]);
      if (errorMessage) {
        newErrors[key] = errorMessage;
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      alert("Formulario enviado correctamente");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar nombres</Form.Label>
              <Form.Control
                type="text"
                name="nombres"
                value={formData.nombres}
                onChange={handleChange}
                isInvalid={!!errors.nombres}
                maxLength={25}
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                {errors.nombres}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="inputApellidos" className="mt-3">
              <Form.Label>Ingresar apellidos</Form.Label>
              <Form.Control
                type="text"
                name="apellidos"
                value={formData.apellidos}
                onChange={handleChange}
                isInvalid={!!errors.apellidos}
                maxLength={25}
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                {errors.apellidos}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="inputUsuario" className="mt-3">
              <Form.Label>Ingresar usuario (email)</Form.Label>
              <Form.Control
                type="email"
                name="usuario"
                value={formData.usuario}
                onChange={handleChange}
                isInvalid={!!errors.usuario}
                maxLength={25}
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                {errors.usuario}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="inputContrasenia" className="mt-3">
              <Form.Label>Ingresar contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasenia"
                value={formData.contrasenia}
                onChange={handleChange}
                isInvalid={!!errors.contrasenia}
                maxLength={25}
              />
              <Form.Control.Feedback type="invalid" className="text-danger">
                {errors.contrasenia}
              </Form.Control.Feedback>
            </Form.Group>

            <Button type="submit" className="mt-4">Agregar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewUser;
