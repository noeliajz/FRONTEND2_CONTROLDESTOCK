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

  // Obtener todos los productos del backend
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/product");

        if (!res.ok) {
          throw new Error(`Error HTTP: ${res.status}`);
        }

        const data = await res.json();
        if (!data.productos) {
          throw new Error("El backend no devolvió obtenerTodosProductos");
        }

        setProducts(data.productos);
        setFilteredProducts(data.productos); // Inicialmente mostrar todos
      } catch (err) {
        console.error("Error obteniendo productos:", err.message);
        setError(err.message);
      }
    };

    getAllProducts();
  }, []);

  // Validar y filtrar productos cuando se busca por categoría
  const handleSearch = (event) => {
    event.preventDefault(); // Evita recarga de la página

    const categoriaBuscada = searchCategory.trim().toLowerCase();

    // Verificar si el formulario está vacío
    if (categoriaBuscada === "") {
      setError("El campo de búsqueda no puede estar vacío.");
      setFilteredProducts([]); // No mostrar productos
      return;
    }

    // Verificar si la categoría es válida
    const categoriasValidas = ["hombre", "mujer", "niños"];
    if (!categoriasValidas.includes(categoriaBuscada)) {
      setError("La categoría debe ser 'hombre', 'mujer' o 'niños'.");
      setFilteredProducts([]); // No mostrar productos
      return;
    }

    // Si pasa las validaciones, realizar la búsqueda
    const filtered = products.filter((product) =>
      product.categoria?.toLowerCase().includes(categoriaBuscada)
    );

    setFilteredProducts(filtered);
    setError(null); // Limpiar el mensaje de error
  };

  // Eliminar el mensaje de error cuando el usuario comienza a escribir
  const handleInputChange = (e) => {
    setSearchCategory(e.target.value);
    setError(null); // Limpiar el mensaje de error cuando se escribe
  };

  return (
    <Container fluid className="colorCardAllProducts p-5">
      {/* Formulario de búsqueda */}
      <Form className="p-5" onSubmit={handleSearch}>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Ingresar categoría"
              className="mr-sm-2"
              value={searchCategory}
              onChange={handleInputChange} // Limpiar error al escribir
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Buscar</Button>
          </Col>
        </Row>
      </Form>

      {/* Mostrar mensaje de error */}
      {error && (
        <p style={{ color: "red", textAlign: "center", fontSize: "1.2rem" }}>
          {error}
        </p>
      )}

      {/* Mostrar productos filtrados */}
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
