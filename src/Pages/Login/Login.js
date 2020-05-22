import React, { useState } from "react";
import "./Login.css";
import { Container, Row, Navbar, Nav, Form, Button } from "react-bootstrap";

export default function Login() {
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function validateLogin(props) {
    console.log("Username ", username, " password ", password);
  }

  return (
    <div>
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
