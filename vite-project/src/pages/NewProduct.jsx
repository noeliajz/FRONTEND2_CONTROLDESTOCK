import React, { useState } from "react";
import Swal from "sweetalert2";
import { Container, Row, Col, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function NewProduct() {
  const [formValues, setFormValues] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    stock: "",
    categoria: "",
  });
  const [imagenFile, setImagenFile] = useState(null);
  const [errors, setErrors] = useState({
    nombre: false,
    precio: false,
    descripcion: false,
    categoria: false,
    stock: false,
  });

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    if (value.length <= 25) {
      setFormValues((prev) => ({ ...prev, [name]: value }));
    }
    let error = false;
    if (["nombre", "descripcion", "categoria"].includes(name)) {
      error = value.length < 3 || value.length > 25;
    }
    if (["precio", "stock"].includes(name)) {
      const numValue = Number(value);
      error =
        value.length < 1 ||
        value.length > 25 ||
        numValue < 1 ||
        numValue > 1000000000;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    const token = localStorage.getItem('token');
    if (
      !formValues.nombre ||
      !formValues.descripcion ||
      !imagenFile ||
      !formValues.precio ||
      !formValues.stock ||
      !formValues.categoria
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Todos los campos son obligatorios",
      });
      return;
    }
    try {
      const formData = new FormData();
      formData.append("nombre", formValues.nombre);
      formData.append("precio", formValues.precio);
      formData.append("descripcion", formValues.descripcion);
      formData.append("stock", formValues.stock);
      formData.append("categoria", formValues.categoria);
      formData.append("imagen", imagenFile);
      const res = await fetch(`backend-control-de-stock.vercel.app
/api/product`, {
        method: "POST",
        headers: {
          'Authorization': `${token}`
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Error al crear el producto");
      Swal.fire({
        icon: "success",
        title: "Producto creado",
        text: "El producto se creó correctamente",
      });
    } catch (error) {
      console.error("Error creando el producto:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo crear el producto",
      });
    }
  };

  return (
    <Container fluid className="estiloLoginContenedor pt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                onChange={handleChange}
                value={formValues.nombre}
              />
              {errors.nombre && (
                <small style={{ color: "red" }}>
                  Se permite entre 3 a 25 caracteres
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="inputPrecio" className="mt-3">
              <Form.Label>Ingresar el precio</Form.Label>
              <Form.Control
                type="number"
                name="precio"
                onChange={handleChange}
                value={formValues.precio}
              />
              {errors.precio && (
                <small style={{ color: "red" }}>
                  Debe estar entre 1 y 1,000,000,000
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="inputDescripcion" className="mt-3">
              <Form.Label>Ingresar una descripción</Form.Label>
              <Form.Control
                type="text"
                name="descripcion"
                onChange={handleChange}
                value={formValues.descripcion}
              />
              {errors.descripcion && (
                <small style={{ color: "red" }}>
                  Se permite entre 3 a 25 caracteres
                </small>
              )}
            </Form.Group>
            <Form.Group controlId="inputStock" className="mt-3">
              <Form.Label>Ingresar stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                onChange={handleChange}
                value={formValues.stock}
              />
              {errors.stock && (
                <small style={{ color: "red" }}>
                  Debe estar entre 1 y 1,000,000,000
                </small>
              )}
            </Form.Group>

            <Form.Group controlId="archivoImagen" className="mt-3">
              <Form.Label>Agregar una Imagen</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) => setImagenFile(e.target.files[0])}
              />
            </Form.Group>

            <Form.Group controlId="inputCategoria" className="mt-3">
              <Form.Label>Agregar la categoría del producto</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                onChange={handleChange}
                value={formValues.categoria}
              />
              {errors.categoria && (
                <small style={{ color: "red" }}>
                  Se permite entre 3 a 25 caracteres
                </small>
              )}
            </Form.Group>

            <NavLink
              to="#"
              className="text-center mt-4 colorBoton fs-4"
              onClick={handleClick}
            >
              Guardar Cambios
            </NavLink>
          </Form>
        </Col>
        <NavLink to="/CrudProducts" className="fs-4 colorBoton">
          Volver
        </NavLink>
      </Row>
    </Container>
  );
}

export default NewProduct;
