import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from 'react';

function CardAllProducts() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  const getAllProducts = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/product');

      if (!res.ok) {
        throw new Error(`Error HTTP: ${res.status}`);
      }
      const data = await res.json();
      if (!data.productos) {
        throw new Error("El backend no devolvió obtenerTodosProductos");
      }
      setProducts(data.productos);
    } catch (err) {
      console.error("Error obteniendo productos:", err.message);
      setError(err.message);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Container fluid className='colorCardAllProducts'>
      <Row className="justify-content-center">
        {error ? (
          <p style={{ color: "red" }}>Error: {error}</p>
        ) : (
          products.map((product, index) => (
            <Col key={index} sm={12} md={6} lg={3} className="d-flex justify-content-center mb-4">
              <h1>ENVIO GRATIS a todo el país a partir de $149.990</h1>
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={product.imagen || 'imagen'} />
                <Card.Body>
                  <Card.Title>{product.nombre || "Producto"}</Card.Title>
                  <Card.Text>{product.descripcion || "Sin descripción"}</Card.Text>
                  <Card.Text>
                    Precio: ${product.precio || "No disponible"}
                  </Card.Text>
                  <Button variant="primary">Ver más</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        )}
      </Row>
    </Container>
  );
}

export default CardAllProducts;
