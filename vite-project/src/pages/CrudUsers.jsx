import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {faFilePen} from "@fortawesome/free-solid-svg-icons"

const CrudUsers = () => {
  const [users, setusers] = useState([]);

  const getAllUsers = async () => {
    const res = await fetch("http://localhost:8080/api");
    const data = await res.json();
    console.log(data.allUsers);
    setusers(data.allUsers || []);
  };

  const deleteUser = async (id) => {
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este usuario?"
    );

    if (isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log(`Usuario con id ${id} eliminado`);
          getAllUsers(); // Recargar la lista de productos después de eliminar
        } else {
          const errorData = await res.json();
          console.error("Error al eliminar el usuario:", errorData);
          alert(
            `Error al eliminar el usuario: ${
              errorData.message || "Desconocido"
            }`
          );
        }
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
        alert(`Error al eliminar el usuario: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      <Container fluid className="estiloLoginContenedor">
        <h2 className="text-center pt-4">CRUD de Usuarios</h2>
        <NavLink to="/NewUser" className="fs-4 colorBoton">
          Agregar
        </NavLink>{" "}
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
                <td>{user.contrasenia}</td>
                <td>
                  <Link to={`/UserEdit/${user._id}`}>
                    <Button variant="warning" size="sm">
                    <FontAwesomeIcon icon={faFilePen} beat />
                    </Button>
                  </Link>{" "}
                  <Button
                    variant="danger"
                    onClick={() => deleteUser(user._id)}
                    size="sm"
                  >
                  <FontAwesomeIcon icon={faTrashCan} beat />
                  </Button>{" "}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className="text-center">
          <NavLink to="/UserPage" className="fs-4 colorBoton">
            Volver
          </NavLink>
        </div>
      </Container>
    </>
  );
};

export default CrudUsers;
