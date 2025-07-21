import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

const CrudUsers = () => {
  const [users, setusers] = useState([]);
const url = import.meta.env.VITE_API_URL

  const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `${token}`
      }
    });
    const data = await res.json();
    setusers(data.allUsers || []);
  };

  const deleteUser = async (id) => {
    const isConfirmed = window.confirm("¿Estás seguro de que deseas eliminar este usuario?");
    if (isConfirmed) {
      try {
        const token = localStorage.getItem('token');
      const res = await fetch(url+`/${id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
           Authorization: `${token}`
        },
      });
      if (res.ok) {
        getAllUsers();
      } else {
        const errorData = await res.json();
        alert(`Error al eliminar el usuario: ${errorData.message || "Desconocido"}`);
      }
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert(`Error al eliminar el producto: ${error.message}`);
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
              <th>Contrasenia</th>
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
          <NavLink to="/" className="fs-4 colorBoton">
            Volver
          </NavLink>
        </div>
      </Container>
    </>
  );
};

export default CrudUsers;
