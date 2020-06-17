import React, { useState } from "react";
import "./Login.css";
import { Alert, Container, Row, Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../Redux/actions.js";

function Login(props) {
  let history = useHistory();
  let [authFail, setAuthFail] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function validateLogin(e) {
    e.preventDefault();
    console.log("Username ", username, " password ", password);
    // Valid Credentials
    if (username === "admin@home.com" && password === "root") {
      // call the login action
      props.loginAction("admin@home.com");
      history.push("/Home");
    } else {
      setAuthFail(true);
    }
  }

  return (
    <div>
      {/* Login Form */}
      <Container fluid>
        <Row className="headerWrapper">
          <h1 className="headerText">LOG IN TO YOUR PROFILE</h1>
        </Row>
        <Form className="formWrapper" onSubmit={validateLogin}>
          <Alert
            show={authFail}
            variant="danger"
            dismissible="true"
            onClose={() => setAuthFail(false)}
          >
            Incorrect Username or Password.
          </Alert>
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

const mapDispatchToProps = { loginAction: login }

export default connect(
  null,
  mapDispatchToProps
)(Login)
