import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Col, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";

function CardAllProducts() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchCategory, setSearchCategory] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:3000/api/product", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        if (!data.productos) {
          throw new Error("El backend no devolvió obtenerTodosProductos");
        }

        setProducts(data.productos);
        setFilteredProducts(data.productos);
      } catch (err) {
        console.error("Error obteniendo productos:", err.message);
        setError(err.message);
      }
    };

    getAllProducts();
  }, []);

  const handleInputChange = (e) => {
    const categoriaSeleccionada = e.target.value;
    setSearchCategory(categoriaSeleccionada);

    if (categoriaSeleccionada === "") {
      setFilteredProducts(products);
      setError(null);
      return;
    }

    const filtered = products.filter((product) =>
      product.categoria?.toLowerCase().includes(categoriaSeleccionada.toLowerCase())
    );

    if (filtered.length === 0) {
      setError("No se encontraron productos en esa categoría.");
    } else {
      setError(null);
    }

    setFilteredProducts(filtered);
  };

  return (
    <Container fluid className="colorCardAllProducts p-5">
      <Form className="p-5">
        <Row>
          <Col xs="auto">
            <Form.Select
              value={searchCategory}
              onChange={handleInputChange}
              className="mr-sm-2"
            >
              <option value="">Seleccionar una categoría</option>
              <option value="hombre">Hombre</option>
              <option value="mujer">Mujer</option>
              <option value="niños">Niños</option>
            </Form.Select>
          </Col>
        </Row>
      </Form>

      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>
          {error}
        </p>
      )}

      <Row className="justify-content-center">
        {filteredProducts.map((product, index) => (
          <Col
            key={index}
            sm={12}
            md={6}
            lg={3}
            className="d-flex justify-content-center mb-4"
          >
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={product.imagen || "imagen"} />
              <Card.Body>
                <Card.Title>{product.nombre || "Producto"}</Card.Title>
                <Card.Text>{product.descripcion || "Sin descripción"}</Card.Text>
                <Card.Text>Precio: ${product.precio || "No disponible"}</Card.Text>
                <Card.Text>Categoría: {product.categoria || "Sin categoría"}</Card.Text>
                <Button variant="primary">Ver más</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CardAllProducts;
