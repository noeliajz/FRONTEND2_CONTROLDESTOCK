import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function ProductEdit() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
    imagen: '',
    categoria: '',
  });

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

    if (['nombre', 'descripcion', 'categoria'].includes(name)) {
      error = value.length < 3 || value.length > 25;
    }

    if (['precio', 'stock'].includes(name)) {
      const numValue = Number(value);
      error = value.length < 1 || value.length > 25 || numValue < 1 || numValue > 1000000000;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const getProduct = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/product/${id}`);
      if (!res.ok) throw new Error('No se pudo obtener el producto');

      const data = await res.json();
      console.log('Producto recibido:', data);

      const producto = data.obtenerUnProducto || data.producto || data;

      setFormValues({
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        descripcion: producto.descripcion || '',
        stock: producto.stock || '',
        imagen: producto.imagen || '',
        categoria: producto.categoria || '',
      });
    } catch (error) {
      console.error('Error obteniendo el producto:', error);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();

    if (!formValues.nombre || !formValues.descripcion || !formValues.imagen || !formValues.precio || !formValues.stock) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/product/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error('Error al actualizar el producto');

      Swal.fire({
        icon: 'success',
        title: 'Producto actualizado',
        text: 'El producto se actualizó correctamente',
      });
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el producto',
      });
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Nombre del producto</Form.Label>
              <Form.Control type="text" name="nombre" onChange={handleChange} value={formValues.nombre} />
              {errors.nombre && <small style={{ color: 'red' }}>Se permite entre 3 a 25 caracteres</small>}
            </Form.Group>
            <Form.Group controlId="inputPrecio" className="mt-3">
              <Form.Label>Precio</Form.Label>
              <Form.Control type="number" name="precio" onChange={handleChange} value={formValues.precio} />
              {errors.precio && <small style={{ color: 'red' }}>Debe estar entre 1 y 1,000,000,000</small>}
            </Form.Group>
            <Form.Group controlId="inputDescripcion" className="mt-3">
              <Form.Label>Descripción</Form.Label>
              <Form.Control type="text" name="descripcion" onChange={handleChange} value={formValues.descripcion} />
              {errors.descripcion && <small style={{ color: 'red' }}>Se permite entre 3 a 25 caracteres</small>}
            </Form.Group>
            <Form.Group controlId="inputStock" className="mt-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control type="number" name="stock" onChange={handleChange} value={formValues.stock} />
              {errors.stock && <small style={{ color: 'red' }}>Debe estar entre 1 y 1,000,000,000</small>}
            </Form.Group>
            <Form.Group controlId="inputImagen" className="mt-3">
              <Form.Label>Link de imagen</Form.Label>
              <Form.Control type="text" name="imagen" onChange={handleChange} value={formValues.imagen} />
            </Form.Group>
            <Form.Group controlId="inputCategoria" className="mt-3">
              <Form.Label>Categoría</Form.Label>
              <Form.Control type="text" name="categoria" onChange={handleChange} value={formValues.categoria} />
              {errors.categoria && <small style={{ color: 'red' }}>Se permite entre 3 a 25 caracteres</small>}
            </Form.Group>
            <Button type="submit" onClick={handleClick} className="mt-4">
              Guardar Cambios
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductEdit;
