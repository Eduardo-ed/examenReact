import React from 'react';
import {
  Table,
  Card,
  Container,
  Button,
  Row,
  Col,
  Form,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap';

class Tabla extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      marcasData: [],
      selectedItem: '',
      selectedItemImagen: '',
      favoritos: [],
    };
    this.change = this.change.bind(this);
    this.guardarMovil = this.guardarMovil.bind(this);
    this.reload = this.reload.bind(this);
    this.marca = React.createRef();
  }

  change(item) {
    this.rellenarCarta(item.slug);
  }

  async rellenarCarta(slug) {
    const response = await fetch(
      'https://api-mobilespecs.azharimm.site/v2/' + slug
    );
    const responseData = await response.json();
    const datos = responseData.data;
    this.setState({
      selectedItem: datos,
      selectedItemImagen: datos.phone_images[0],
    });
  }

  async componentDidMount() {
    const response = await fetch(
      'https://api-mobilespecs.azharimm.site/v2/top-by-fans'
    );
    const responseData = await response.json();
    const datos = responseData.data.phones;
    this.setState({
      tableData: datos,
      favoritos: localStorage.getItem('favoritos'),
    });
    this.marcas();
  }

  async marcas() {
    const response = await fetch(
      'https://api-mobilespecs.azharimm.site/v2/brands'
    );
    const responseData = await response.json();
    const datos = responseData.data;
    this.setState({ marcasData: datos });
  }

  async reload() {
    const response = await fetch(
      'https://api-mobilespecs.azharimm.site/v2/search?query= ' +
        this.marca.current.value
    );
    const responseData = await response.json();
    const datos = responseData.data.phones;
    this.setState({ tableData: datos });
  }

  guardarMovil() {
    this.setState({ favoritos: this.state.favoritos.push(selectedItem) });

    localStorage.setItem('favoritos', this.state.favoritos);
  }

  render() {
    return (
      <Container>
        <h1>Tabla moviles</h1>
        <Row>
          <Col lg={8} md={6}>
            <Table striped bordered hover size="sm" variant="light">
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Modelo</th>
                </tr>
              </thead>
              <tbody>
                {this.state.tableData.map((item) => {
                  return (
                    <tr onClick={() => this.change(item)}>
                      <td>{item.slug}</td>
                      <td>{item.phone_name}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
          <Col lg={4} md={6}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={this.state.selectedItemImagen} />
              <Card.Body>
                <Card.Title>
                  {this.state.selectedItem.brand}
                  {this.state.selectedItem.phone_name}
                </Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroupItem>S.O: {this.state.selectedItem.os}</ListGroupItem>
                <ListGroupItem>
                  Dimension: {this.state.selectedItem.dimension}
                </ListGroupItem>
                <ListGroupItem>
                  Almacenamiento: {this.state.selectedItem.storage}
                </ListGroupItem>
              </ListGroup>
              <Card.Body>
                <Button variant="primary" onClick={this.guardarMovil}>
                  Añadir
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Marcas</Form.Label>
                <Form.Select ref={this.marca}>
                  {this.state.marcasData.map((item) => {
                    return <option>{item.brand_name}</option>;
                  })}
                </Form.Select>
              </Form.Group>
            </Form>
          </Col>
          <Col>
            <br />
            <Button variant="primary" type="button" onClick={this.reload}>
              Buscar
            </Button>
          </Col>
        </Row>
        <br />
      </Container>
    );
  }
}

export default Tabla;
