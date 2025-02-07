import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {faFilePen} from "@fortawesome/free-solid-svg-icons"

const CrudProducts = () => {
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/product");
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
    const isConfirmed = window.confirm(
      "¿Estás seguro de que deseas eliminar este producto?"
    );

    if (isConfirmed) {
      try {
        const res = await fetch(`http://localhost:8080/api/product/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (res.ok) {
          console.log(`Producto con id ${id} eliminado`);
          getAllProducts(); // Recargar la lista de productos después de eliminar
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
    <>
      <Container fluid className="estiloLoginContenedor">
        <h2 className="text-center pt-4">CRUD de Productos</h2>
        <NavLink to="/NewProduct" className="colorBoton fs-4">
          Agregar
        </NavLink>
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
                    style={{
                      width: "50px",
                      height: "50px",
                      objectFit: "cover",
                    }}
                  />
                </td>
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
          <NavLink to="/UserPage" className="colorBoton fs-4">
            Volver
          </NavLink>
        </div>
      </Container>
    </>
  );
};

export default CrudProducts;
