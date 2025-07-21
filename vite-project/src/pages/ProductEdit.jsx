import  { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form } from 'react-bootstrap';

function ProductEdit() {
  const url = import.meta.env.VITE_API_URL

  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    nombre: '',
    precio: '',
    descripcion: '',
    stock: '',
    categoria: '',
  });
  const [imagenFile, setImagenFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const getProduct = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(url+`/product/${id}`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `${token}`
        }
      });
      const data = await res.json();
      console.log(data)
      const producto = data.obtenerUnProducto || data.producto || data;
      setFormValues({
        nombre: producto.nombre || '',
        precio: producto.precio || '',
        descripcion: producto.descripcion || '',
        stock: producto.stock || '',
        categoria: producto.categoria || '',
      });
    } catch (error) {
      console.error('Error obteniendo el producto:', error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!formValues.nombre.trim()) {
      Swal.fire('Error', 'El nombre del producto es obligatorio', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('nombre', formValues.nombre);
    formData.append('precio', parseFloat(formValues.precio));
    formData.append('descripcion', formValues.descripcion);
    formData.append('stock', parseInt(formValues.stock));
    formData.append('categoria', formValues.categoria);
    if (imagenFile) {
      formData.append('imagen', imagenFile);
    }

    try {
      const res = await fetch(url+`/product/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`
        },
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.mensaje || 'Error al actualizar el producto');

      Swal.fire('Éxito', 'Producto actualizado correctamente', 'success').then(() => {
        window.location.href = '/CrudProducts';
      });
    } catch (error) {
      console.error('Error actualizando el producto:', error);
      Swal.fire('Error', 'No se pudo actualizar el producto', 'error');
    }
  };

  useEffect(() => {
    if (id) getProduct();
  }, [id]);

  return (
    <Container fluid className="estiloLoginContenedor py-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar nombre del producto</Form.Label>
              <Form.Control type="text" name="nombre" onChange={handleChange} value={formValues.nombre} />
            </Form.Group>
            <Form.Group controlId="inputPrecio" className="mt-3">
              <Form.Label>Ingresar el precio</Form.Label>
              <Form.Control type="number" name="precio" onChange={handleChange} value={formValues.precio} />
            </Form.Group>
            <Form.Group controlId="inputDescripcion" className="mt-3">
              <Form.Label>Ingresar una descripción</Form.Label>
              <Form.Control type="text" name="descripcion" onChange={handleChange} value={formValues.descripcion} />
            </Form.Group>
            <Form.Group controlId="inputStock" className="mt-3">
              <Form.Label>Ingresar el stock</Form.Label>
              <Form.Control type="number" name="stock" onChange={handleChange} value={formValues.stock} />
            </Form.Group>
            <Form.Group controlId="inputImagen" className="mt-3">
              <Form.Label>Ingresar una imagen</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={(e) => setImagenFile(e.target.files[0])} />
            </Form.Group>
            <Form.Group controlId="inputCategoria" className="mt-3">
              <Form.Label>Ingresar la categoría del producto</Form.Label>
              <Form.Control type="text" name="categoria" onChange={handleChange} value={formValues.categoria} />
            </Form.Group>
            <NavLink to="#" className="colorBoton fs-4 py-3" onClick={handleClick}>
              Guardar Cambios
            </NavLink>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductEdit;
