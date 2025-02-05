import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";

const CrudUsers = () => {
  const [users, setusers] = useState([]);

  const getAllUsers = async () => {
    const res = await fetch("http://localhost:8080/api");
    const data = await res.json();
    console.log(data.allUsers)
    setusers(data.allUsers || []);
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <h2 className="text-center mt-4">CRUD de Productos</h2>
      <Link to='/NewUser'>Nuevo</Link>{' '}
      <Table responsive striped bordered hover className="m-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Nombres</th>
            <th>Apellido</th>
            <th>Usuario</th>
            <th>Contraseña</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id || index}>
              <td>{index + 1}</td>
              <td>{user.nombres}</td>
              <td>{user.apellido}</td>
              <td>{user.usuario}</td>
              <td>${user.contraseña}</td>
              <td>
                <Button variant="warning" size="sm">Editar</Button>{' '}
                <Button variant="danger" size="sm">Eliminar</Button>{' '}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="text-center">
        <NavLink to="/UserPage" className="btn btn-primary">Aceptar</NavLink>
      </div>
      <Footer />
    </>
  );
};

export default CrudUsers;
