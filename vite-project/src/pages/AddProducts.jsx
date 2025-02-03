import React from "react";
import { NavLink } from "react-router-dom";  // Agregar esta importación
import Table from "react-bootstrap/Table";
import Navbar2 from "../components/Navbar2";
import Footer from "../components/Footer";

const AddProducts = () => {
  return (
    <>
      <h2>Agregar productos</h2>
      <Navbar2/>
      <Table responsive striped bordered hover>
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
      <NavLink to="/UserPage" className="btn btn-primary">Aceptar</NavLink>
      <Footer/>
    </>
  );
};

export default AddProducts;
