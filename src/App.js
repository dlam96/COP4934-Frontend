import React from "react";
import "bootstrap/dist/css/bootstrap.css";
// import { Nav, Navbar } from "react-bootstrap";
import Routes from "./Routes/Routes.js";
import Navbar from "./Components/Navbar/Navbar.jsx";
// import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
