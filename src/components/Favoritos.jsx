import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Usuarios } from '../data/Usuarios';

class Favoritos extends React.Component {
  constructor(props) {
    super(props);
    this.state = { favoritos: [], selectedItemImagen: '', selectedItem: '' };
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
                <Card.Img variant="top" src={this.state.selectedItemImagen} />
                <Card.Body>
                  <Card.Title>
                    {this.state.selectedItem.brand}
                    {this.state.selectedItem.phone_name}
                  </Card.Title>
                </Card.Body>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    S.O: {this.state.selectedItem.os}
                  </ListGroupItem>
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
            );
          })}
        </Container>
      </div>
    );
  }
}

export default Favoritos;
