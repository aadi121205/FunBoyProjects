import React from "react";
import { Container, Row, Col, Nav, Form, Button } from "react-bootstrap";

const Footer: React.FC = () => {
  return (
    <div className="bg-dark text-light">
      <Container className="py-5">
        <Row className="px-5">
          {[1, 2, 3].map((_, index) => (
            <Col xs={6} md={2} className="mb-3" key={index}>
              <h5>Section</h5>
              <Nav className="flex-column">
                <Nav.Link href="#" className="p-0 text-light">
                  Home
                </Nav.Link>
                <Nav.Link href="#" className="p-0 text-light">
                  Features
                </Nav.Link>
                <Nav.Link href="#" className="p-0 text-light">
                  Pricing
                </Nav.Link>
                <Nav.Link href="#" className="p-0 text-light">
                  FAQs
                </Nav.Link>
                <Nav.Link href="#" className="p-0 text-light">
                  About
                </Nav.Link>
              </Nav>
            </Col>
          ))}

          <Col md={5} className="offset-md-1 mb-3">
            <Form>
              <h5>Subscribe to our newsletter</h5>
              <p>Monthly digest of what's new and exciting from us.</p>
              <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  className="me-2"
                />
                <Button variant="primary" type="button">
                  Subscribe
                </Button>
              </div>
            </Form>
          </Col>
        </Row>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top border-secondary px-5">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Fun Boy Projects. All rights
            reserved.
          </p>
          <ul className="list-unstyled d-flex mb-0">
            <li className="ms-3">
              <a className="text-light" href="#">
                <i className="bi bi-twitter" style={{ fontSize: "1.5rem" }}></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-light" href="#">
                <i
                  className="bi bi-instagram"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
            </li>
            <li className="ms-3">
              <a className="text-light" href="#">
                <i
                  className="bi bi-facebook"
                  style={{ fontSize: "1.5rem" }}
                ></i>
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
