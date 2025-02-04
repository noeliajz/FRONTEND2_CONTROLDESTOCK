import React from "react";
import { NavLink } from "react-router-dom"; // Agregar esta importación
import Table from "react-bootstrap/Table";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const AddProducts = () => {
  return (
    <>
      <Navbar2 />
      <h2>Agregar productos</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ingresar productos</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Buscar
        </Button>
      </Form>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Ingresar cantidad</Form.Label>
          <Form.Control type="text" placeholder="" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Agregar
        </Button>
      </Form>
      <Table responsive striped bordered hover className="m-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Productos</th>
            <th>Cantidad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
      <NavLink to="/UserPage" className="btn btn-primary">
        Aceptar
      </NavLink>
      <Footer />
    </>
  );
};

export default AddProducts;
