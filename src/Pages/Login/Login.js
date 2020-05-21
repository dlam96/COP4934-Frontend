import React, { useState } from "react";
import "./Login.css";
import {
  Container,
  Row,
  Navbar,
  Nav,
  NavDropdown,
  Form,
  Button,
} from "react-bootstrap";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function validateLogin(props) {
    console.log("Username ", username, " password ", password);
  }

  return (
    <div className="wrapper">
      {/* // Navbar */}
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <img src={require("./airforce-logo.jpg")} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="#home" className="pr-5">
              Login
            </Nav.Link>
            <Nav.Link href="#link" className="pr-5">
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      {/* Login Form */}
      <Container fluid>
        <Row className="headerWrapper">
          <h1 className="headerText">LOG IN TO YOUR PROFILE</h1>
        </Row>
        <Form className="formWrapper" onSubmit={validateLogin}>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
          <div>
            <small>FORGOT PASSWORD?</small>
          </div>
        </Form>
      </Container>
    </div>
  );
}
