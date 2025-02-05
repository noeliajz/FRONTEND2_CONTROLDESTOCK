import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";

const NewUser = () => {
  return (
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col md={6}>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar el nombre del producto</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
          <Form>
          </Form>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar el precio</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar la descripción</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar el stock</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
          <Form>
            <Form.Group controlId="inputNombre">
              <Form.Label>Ingresar link de imagen</Form.Label>
              <Form.Control type="text" />
            </Form.Group>
          </Form>
          <button className="m-5">Agregar</button>
        </Col>
      </Row>
    </Container>
  );
};

export default NewUser;
