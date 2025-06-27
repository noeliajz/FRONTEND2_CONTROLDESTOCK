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
        const token = localStorage.getItem('token');
        const res = await fetch("http://localhost:3000/api/product",{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`
        }}
        );

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

  const handleSearch = (event) => {
    event.preventDefault(); 

    const categoriaBuscada = searchCategory.trim().toLowerCase();

    if (categoriaBuscada === "") {
      setError("El campo de búsqueda no puede estar vacío.");
      setFilteredProducts([]); 
      return;
    }

    const categoriasValidas = ["hombre", "mujer", "niños"];
    if (!categoriasValidas.includes(categoriaBuscada)) {
      setError("La categoría debe ser 'hombre', 'mujer' o 'niños'.");
      setFilteredProducts([]); 
      return;
    }

    const filtered = products.filter((product) =>
      product.categoria?.toLowerCase().includes(categoriaBuscada)
    );

    setFilteredProducts(filtered);
    setError(null); 
  };

  const handleInputChange = (e) => {
    setSearchCategory(e.target.value);
    setError(null);
  };

  return (
    <Container fluid className="colorCardAllProducts p-5">
      <Form className="p-5" onSubmit={handleSearch}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Ingresar categoría"
              className="mr-sm-2"
              value={searchCategory}
              onChange={handleInputChange}
              maxLength={15} // Límite de 15 caracteres
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Buscar</Button>
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
