import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Footer from "../components/Footer";
import Button from "react-bootstrap/Button";

const AddProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const res = await fetch("http://localhost:8080/api/product");
    const data = await res.json();
    setProducts(data.productos || []);
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <h2 className="text-center mt-4">Lista de Productos</h2>
      <Table responsive striped bordered hover className="m-5">
        <thead>
          <tr>
            <th>#</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Fecha de ingreso</th>
            <th>Imagen</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product._id || index}>
              <td>{index + 1}</td>
              <td>{product.nombre}</td>
              <td>{product.descripcion}</td>
              <td>{product.stock}</td>
              <td>${product.precio}</td>
              <td>{new Date(product.fecha).toLocaleDateString()}</td>
              <td>
                <img
                  src={`http://localhost:8080/${product.imagen}`}
                  alt={product.nombre}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>
                <Button variant="warning" size="sm">Editar</Button>{' '}
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

export default AddProducts;
