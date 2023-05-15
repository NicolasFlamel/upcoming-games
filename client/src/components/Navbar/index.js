import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const Navigation = () => {
  return (
    <Navbar>
      <Container>
        <Navbar.Brand href="#home">Upcoming Games</Navbar.Brand>
        <Nav>
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/login">Login</Nav.Link>
        </Nav>
        <Form className="d-flex just">
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2 game-search-bar"
            aria-label="Search"
          />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Container>
    </Navbar>
  );
};

export default Navigation;
