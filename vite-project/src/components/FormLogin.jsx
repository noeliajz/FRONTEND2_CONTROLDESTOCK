import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";

const FormLogin = () => {
  const navigate = useNavigate();

  const [formInputs, setFormInputs] = useState({
    usuario: "",
    contrasenia: "",
  });

  const [errores, setErrores] = useState({
    usuario: "",
    contrasenia: "",
  });

  const validarUsuario = (usuario) => {
    if (usuario.length < 3 || usuario.length > 25) {
      return "Debe tener entre 3 y 25 caracteres.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(usuario)) {
      return "Debe ser un correo válido.";
    }
    return "";
  };

  const validarContrasenia = (contrasenia) => {
    if (contrasenia.length < 4 || contrasenia.length > 25) {
      return "Debe tener entre 4 y 25 caracteres.";
    }
    return "";
  };

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    if (value.length > 25) return;

    setFormInputs({ ...formInputs, [name]: value });

    let errorMsg = "";
    if (name === "usuario") errorMsg = validarUsuario(value);
    if (name === "contrasenia") errorMsg = validarContrasenia(value);

    setErrores({ ...errores, [name]: errorMsg });
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();

    const usuarioError = validarUsuario(formInputs.usuario);
    const contraseniaError = validarContrasenia(formInputs.contrasenia);

    if (usuarioError || contraseniaError) {
      setErrores({
        usuario: usuarioError,
        contrasenia: contraseniaError,
      });
      return;
    }

    try {
      const res = await axios.post("http://localhost:8080/api/login", formInputs, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      alert("Inicio de sesión exitoso");
      setTimeout(() => {
        navigate("/UserPage");
      }, 3000);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Credenciales incorrectas.";
      alert("Error en el inicio de sesión: " + errorMessage);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col className="d-flex justify-content-center" sm={12} md={10} lg={12}>
          <Form className="p-5 text-center" onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicUsuario">
              <Form.Label>Ingresar usuario</Form.Label>
              <Form.Control
                name="usuario"
                value={formInputs.usuario}
                onChange={handleChange}
                className={errores.usuario ? "form-control is-invalid" : "form-control"}
                type="text"
                maxLength={25}
                placeholder=""
                required
              />
              {errores.usuario && <Form.Text className="text-danger">{errores.usuario}</Form.Text>}
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
                placeholder=""
                required
              />
              {errores.contrasenia && <Form.Text className="text-danger">{errores.contrasenia}</Form.Text>}
            </Form.Group>
            <Button style={{ background: "#000000", color: "#CCFF01" }} type="submit">
              Ingresar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormLogin;
