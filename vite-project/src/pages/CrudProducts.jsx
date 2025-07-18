import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faFilePen } from "@fortawesome/free-solid-svg-icons";

const CrudProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("backend-control-de-stock.vercel.app
/api/product", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      });
      const data = await res.json();
      if (res.ok) {
        setProducts(data.productos || []);
      } else {
        console.error("Error al cargar los productos");
      }
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );
    if (isConfirmed) {
      try {
        const res = await fetch(`backend-control-de-stock.vercel.app
/api/product/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });
        if (res.ok) {
          getAllProducts();
        } else {
          const errorData = await res.json();
          console.error("Error al eliminar el producto:", errorData);
          alert(
            `Error al eliminar el producto: ${
              errorData.message || "Desconocido"
            }`
          );
        }
      } catch (error) {
        console.error("Error al eliminar producto:", error);
        alert(`Error al eliminar el producto: ${error.message}`);
      }
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container fluid className="estiloLoginContenedor">
      <h2 className="text-center pt-4">CRUD de Productos</h2>
      <NavLink to="/NewProduct" className="colorBoton fs-4">
        Agregar
      </NavLink>
      <Table responsive striped bordered hover className="m-5">
        <thead>
          <tr>
            <th>Id</th>
            <th>Producto</th>
            <th>Descripción</th>
            <th>Stock</th>
            <th>Precio</th>
            <th>Imagen</th>
            <th>Categoría</th>
            <th>Fecha</th>
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
              <td>
                <img
                  src={`backend-control-de-stock.vercel.app
/${product.imagen}`}
                  alt={product.nombre}
                  style={{
                    width: "50px",
                    height: "50px",
                    objectFit: "cover",
                  }}
                />
              </td>
              <td>{product.categoria}</td>
              <td>{new Date(product.fecha).toLocaleDateString()}</td>
              <td>
                <Link to={`/ProductEdit/${product._id}`}>
                  <Button variant="warning" size="sm">
                    <FontAwesomeIcon icon={faFilePen} beat />
                  </Button>
                </Link>{" "}
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(product._id)}
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
        <NavLink to="/" className="colorBoton fs-4">
          Volver
        </NavLink>
      </div>
    </Container>
  );
};

export default CrudProducts;
