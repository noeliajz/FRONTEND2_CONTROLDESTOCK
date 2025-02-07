import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { Container, Row, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NewUser() {
  const [formValues, setFormValues] = useState({
    nombres: "",
    apellido: "",
    usuario: "",
    contrasenia: ""
  });

  const [errors, setErrors] = useState({
    nombres: false,
    apellido: false,
    usuario: false,
    contrasenia: false
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;

    if (value.length <= 25) {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }

    let error = false;

    if (["nombres", "apellido", "usuario"].includes(name)) {
      error = value.length < 3 || value.length > 25;
    }

    if (name === "contrasenia") {
      error = value.length < 4 || value.length > 25;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleClick = async (ev) => {
    ev.preventDefault();

    if (
      !formValues.nombres ||
      !formValues.apellido ||
      !formValues.usuario ||
      !formValues.contrasenia
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error("Error al actualizar el usuario");

      Swal.fire({
        icon: "success",
        title: "Usuario actualizado",
        text: "El usuario se actualizó correctamente",
      });
    } catch (error) {
      console.error("Error actualizando el usuario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo actualizar el usuario",
      });
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api`);
        if (!res.ok) throw new Error("No se pudo obtener el usuario");

        const data = await res.json();
        const usuario = data.getOneUser || data.usuario || data;

        setFormValues({
          nombres: usuario.nombres || "",
          apellido: usuario.apellido || "",
          usuario: usuario.usuario || "",
          contrasenia: usuario.contrasenia || ""
        });
      } catch (error) {
        console.error("Error obteniendo el usuario:", error);
      }
    };
    getUser();
  }, []);

  return (
    <Container fluid className="estiloLoginContenedor pt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="inputNombres">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                type="text"
                name="nombres"
                onChange={handleChange}
                value={formValues.nombres}
              />
              {errors.nombres && (
                <small style={{ color: "red" }}>
                  Se permite entre 3 a 25 caracteres
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="inputApellido" className="mt-3">
              <Form.Label>Apellido</Form.Label>
              <Form.Control
                type="text"
                name="apellido"
                onChange={handleChange}
                value={formValues.apellido}
              />
              {errors.apellido && (
                <small style={{ color: "red" }}>
                  Se permite entre 3 a 25 caracteres
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="inputUsuario" className="mt-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control
                type="email"
                name="usuario"
                onChange={handleChange}
                value={formValues.usuario}
              />
              {errors.usuario && (
                <small style={{ color: "red" }}>
                  El usuario debe tener entre 3 y 25 caracteres
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="inputContrasenia" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                name="contrasenia"
                onChange={handleChange}
                value={formValues.contrasenia}
              />
              {errors.contrasenia && (
                <small style={{ color: "red" }}>
                  Se permite entre 4 a 25 caracteres
                </small>
              )}
            </Form.Group>
            <NavLink
              to="#"
              className=" fs-4 colorBoton"
              onClick={handleClick}
            >
              Guardar
            </NavLink>
          </Form>
        </Col>
        <NavLink to="/CrudUsers" className="fs-4 colorBoton">Volver</NavLink>
      </Row>
    </Container>
  );
}

export default NewUser;
