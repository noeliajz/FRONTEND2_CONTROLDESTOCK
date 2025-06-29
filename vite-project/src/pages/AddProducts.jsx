import React, { useState, useEffect } from "react";
import { NavLink , Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import { Container } from "react-bootstrap";

const AddProducts = () => {
  const [products, setProducts] = useState([]);

const getAllProducts = async () => {
  const token = localStorage.getItem("token");

  try {
    const res = await fetch("http://localhost:3000/api/product", {
      method: "GET",
      headers: {
        "Authorization": `${token}`, // 🔑 Lo más importante
        "Content-Type": "application/json"
      }
    });

    if (!res.ok) {
      throw new Error(`Error HTTP: ${res.status}`);
    }

    const data = await res.json();
    setProducts(data.productos || []);
  } catch (error) {
    console.error("Error obteniendo productos:", error);
  }
};


  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <>
      <Container fluid className="estiloLoginContenedor">
        <h2 className="text-center pt-3">Lista de Productos</h2>
        <Table responsive striped bordered hover className="p-5">
          <thead>
            <tr>
              <th>#</th>
              <th>Producto</th>
              <th>Descripción</th>
              <th>Stock</th>
              <th>Precio</th>
              <th>Fecha de ingresos</th>
              <th>Imagen</th>
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
                    src={`http://localhost:3000/${product.imagen}`}
                    alt={product.nombre}
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
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

export default AddProducts;
