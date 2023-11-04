import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const logOutHandle = () => {
    navigate("/");
    localStorage.removeItem("user");
  };
  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>Expense Tracker</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Link to="/expense" className="nav-link">
                Expense
              </Link>
            </Nav>
            <Nav className="me-auto">
              <Button onClick={logOutHandle}>Log out</Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
