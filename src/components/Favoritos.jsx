import React from 'react';
import { Container, Button } from 'react-bootstrap';

class Favoritos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoritos: [], selectedItemImagen: '', selectedItem: '' };
    this.borrar = this.borrar.bind(this);
  }

  componentDidMount() {
    this.setState({
      favoritos: localStorage.getItem('favoritos'),
    });
  }

  componentWillUnmount() {
    localStorage.setItem('favoritos', this.state.favoritos);
  }

  render() {
    return (
      <div className="main-site">
        <Container>
          {this.state.favoritos.map((item) => {
            return (
              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={item.imagen} />
                <Card.Body>
                  <Card.Title>
                    {item.brand}
                    {item.phone_name}
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>S.O: {item.os}</ListGroupItem>
                  <ListGroupItem>Dimension: {item.dimension}</ListGroupItem>
                  <ListGroupItem>Almacenamiento: {item.storage}</ListGroupItem>
                </ListGroup>
                <Card.Body>
                  <Button variant="primary" onClick={this.borrar}>
                    Añadir
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Container>
      </div>
    );
  }
}

export default Favoritos;
