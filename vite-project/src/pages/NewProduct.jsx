import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const NewProduct = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    imagen: "",
  });

  const [errors, setErrors] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    imagen: "",
  });

  const validateField = (name, value) => {
    let error = "";

    if (!value.trim()) {
      return "Este campo es obligatorio";
    }

    if (name === "precio" || name === "stock") {
      const numValue = Number(value);
      if (isNaN(numValue) || numValue < 1 || numValue > 1000000000) {
        return "Debe estar entre 1 y 1,000,000,000";
      }
    } else if (name !== "imagen") {
      if (value.length < 3 || value.length > 25) {
        return "Debe tener entre 3 y 25 caracteres";
      }
    }

    return error;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== "imagen" && value.length > 25) return;

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
      alert("Producto agregado correctamente");
    }
  };

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="inputNombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                isInvalid={!!errors.nombre}
              />
              <Form.Text className="text-danger">{errors.nombre}</Form.Text>
            </Form.Group>

            <Form.Group controlId="inputPrecio" className="mt-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control
                type="text"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                isInvalid={!!errors.precio}
              />
              <Form.Text className="text-danger">{errors.precio}</Form.Text>
            </Form.Group>

            <Form.Group controlId="inputDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                isInvalid={!!errors.descripcion}
              />
              <Form.Text className="text-danger">{errors.descripcion}</Form.Text>
            </Form.Group>

            <Form.Group controlId="inputStock" className="mt-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="text"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                isInvalid={!!errors.stock}
              />
              <Form.Text className="text-danger">{errors.stock}</Form.Text>
            </Form.Group>

            <Form.Group controlId="inputImagen" className="mt-3">
              <Form.Label>Link de imagen</Form.Label>
              <Form.Control
                type="text"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                isInvalid={!!errors.imagen}
              />
              <Form.Text className="text-danger">{errors.imagen}</Form.Text>
            </Form.Group>

            <Button type="submit" className="mt-4">Agregar</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewProduct;
