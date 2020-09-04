import React, { useEffect } from "react";
import { connect } from "react-redux";
import Routes from "./Routes/Routes.js";
import Navbar from "./Components/Navbar/Navbar.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
// import "./App.css";

function App(props) {
  const palletType = props.darkState ? "dark" : "light";
  console.log("DarkMode:", props.darkState);

  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      primary: {
        main: "#00338F",
      },
      // background: {
      //   default: "#222222",
      // },
      secondary: {
        main: "#D2AF39",
      },
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Navbar />
        <Routes />
      </div>
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => {
  return {
    darkState: state.darkModeReducer.darkmode,
  };
};

export default connect(mapStateToProps, null)(App);
