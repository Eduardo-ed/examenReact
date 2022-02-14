import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Menu from './components/Menu';
import { PaginasApp } from './data/PaginasApp';
import { Container } from 'react-bootstrap';

function App() {
  return (
    <Router>
      <Menu />
      <br />
      <Container>
        {PaginasApp.map((item) => {
          return (
            <Route
              key={item.id}
              path={item.path}
              exact
              component={item.component}
            />
          );
        })}
      </Container>
    </Router>
  );
}

export default App;
