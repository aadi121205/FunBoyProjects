import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Button } from "@mui/material";
import Background from "../assets/icon.png";

const NavbarComponent: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">
          <img
            src={Background}
            width="50"
            height="50"
            className="d-inline-block align-top"
            alt="Writing Drive"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>
            <Nav.Link href="/blogs">Blogs</Nav.Link>
          </Nav>

          <Nav className="ml-auto">
            <>
              <Button
                variant="contained"
                color="primary"
                href="/login"
                className="mx-2"
              >
                Login
              </Button>
              <Button variant="outlined" color="primary" href="/signup">
                Sign Up
              </Button>
            </>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;