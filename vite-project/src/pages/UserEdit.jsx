import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Container, Row, Col, Form } from 'react-bootstrap';
import bcrypt from 'bcryptjs';

function UserEdit() {
  const { id } = useParams();
  const [formValues, setFormValues] = useState({
    nombres: '',
    apellido: '',
    usuario: '',
    contrasenia: '',
  });

  const [originalPassword, setOriginalPassword] = useState('');

  const [errors, setErrors] = useState({
    nombres: false,
    apellido: false,
    usuario: false,
    contrasenia: false,
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
    if (name === 'contrasenia') {
      error = value.length < 4 || value.length > 25;
    }
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };

  const getUser = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://localhost:3000/api/${id}`, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    if (!res.ok) return;
    const data = await res.json();
    const usuario = data.getOneUser || data.usuario || data;
    setFormValues({
      nombres: usuario.nombres || '',
      apellido: usuario.apellido || '',
      usuario: usuario.usuario || '',
      contrasenia: '',
    });
    setOriginalPassword(usuario.contrasenia || '');
  };

  const handleClick = async (ev) => {
    ev.preventDefault();
    const token = localStorage.getItem('token');
    if (!formValues.nombres || !formValues.apellido || !formValues.usuario) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Todos los campos son obligatorios',
      });
      return;
    }

    let contrasenia = formValues.contrasenia;
    if (contrasenia && contrasenia !== '') {
      contrasenia = await bcrypt.hash(contrasenia, 10);
    } else {
      contrasenia = originalPassword;
    }

    const updatedUser = {
      ...formValues,
      contrasenia
    };

    const res = await fetch(`http://localhost:3000/api/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${token}`
      },
      body: JSON.stringify(updatedUser),
    });

    if (!res.ok) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo actualizar el usuario',
      });
      return;
    }

    Swal.fire({
      icon: 'success',
      title: 'Usuario actualizado',
      text: 'El usuario se actualizó correctamente',
    }).then(() => {
      window.location.href = "/CrudUsers";
    });
  };

  useEffect(() => {
    if (id) getUser();
  }, [id]);

  return (
    <Container fluid className="estiloLoginContenedor">
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
            <NavLink to="#" className="colorBoton fs-4 " onClick={handleClick}>
              Guardar Cambios
            </NavLink>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UserEdit;
