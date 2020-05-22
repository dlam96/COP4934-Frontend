import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes/Routes.js";
// import "./App.css";

function App() {
  return (
    <div>
      <Navbar expand="lg" className="navbarTheme">
        <Navbar.Brand href="/">
          <img src={require("./airforce.png")} className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Link href="/" className="pr-5 navlinkTheme">
              Login
            </Nav.Link>
            <Nav.Link href="/signup" className="pr-5 navlinkTheme">
              Signup
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;
