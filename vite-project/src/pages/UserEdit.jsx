import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function UserEdit() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    nombres: '',
    apellido: '',
    usuario: '',
    contrasenia: ''
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

    if (['nombres', 'apellido', 'usuario'].includes(name)) {
      error = value.length < 3 || value.length > 25;
    }

    if (['contrasenia'].includes(name)) {
      error = value.length < 4 || value.length > 25;
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const getUser = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/${id}`);
      if (!res.ok) throw new Error('No se pudo obtener el usuario');

      const data = await res.json();
      console.log('Usuario recibido:', data);

      const usuario = data.getOneUser || data.usuario || data;

      setFormValues({
        nombres: usuario.nombre || '',
        apellido: usuario.apellido || '',
        usuario: usuario.usuario || '',
        contrasenia: usuario.contrasenia || ''
      });
    } catch (error) {
      console.error('Error obteniendo el usuario:', error);
    }
  };

  const handleClick = async (ev) => {
    ev.preventDefault();

    if (!formValues.nombres || !formValues.apellido || !formValues.usuario || !formValues.contrasenia) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    try {
      const res = await fetch(`http://localhost:8080/api/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formValues),
      });

      if (!res.ok) throw new Error('Error al actualizar el usuario');

      Swal.fire({
        icon: 'success',
        title: 'Usuario actualizado',
        text: 'El usuario se actualizó correctamente',
      });
    } catch (error) {
      console.error('Error actualizando el usuario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el usuario',
      });
    }
  };

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Nombre del usuario</Form.Label>
              <Form.Control type="text" name="nombres" onChange={handleChange} value={formValues.nombres} />
              {errors.nombres && <small style={{ color: 'red' }}>Se permite entre 3 a 25 caracteres</small>}
            </Form.Group>

            <Form.Group controlId="inputApellido">
              <Form.Label>Apellido del usuario</Form.Label>
              <Form.Control type="text" name="apellido" onChange={handleChange} value={formValues.apellido} />
              {errors.apellido && <small style={{ color: 'red' }}>Se permite entre 3 a 25 caracteres</small>}
            </Form.Group>

            <Form.Group controlId="inputUsuario" className="mt-3">
              <Form.Label>Usuario</Form.Label>
              <Form.Control type="email" name="usuario" onChange={handleChange} value={formValues.usuario} />
              {errors.usuario && <small style={{ color: 'red' }}>Se permite entre 3 a 25 caracteres</small>}
            </Form.Group>

            <Form.Group controlId="inputContrasenia" className="mt-3">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" name="contrasenia" onChange={handleChange} value={formValues.contrasenia} />
              {errors.contrasenia && <small style={{ color: 'red' }}>Se permite entre 4 a 25 caracteres</small>}
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

export default UserEdit;