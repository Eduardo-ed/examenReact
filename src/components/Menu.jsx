import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PaginasApp } from '../data/PaginasApp';

class Menu extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
        <Container>
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-start"
          >
            <Nav>
              {PaginasApp.map((item) => {
                return (
                  <Nav.Link as={Link} to={item.path}>
                    {item.title}
                  </Nav.Link>
                );
              })}
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Brand href="#home">
            Desarrollo de Interfaces: Examen React.js
          </Navbar.Brand>
          <Navbar.Brand href="#home">
            <img
              className="logo-image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/1200px-React.svg.png"
              height="50 em"
            />
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Menu;
