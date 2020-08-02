import React from "react";
import { connect } from "react-redux";
import Routes from "./Routes/Routes.js";
import Navbar from "./Components/Navbar/Navbar.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import "./App.css";

function App(props) {
  const palletType = props.darkState ? "dark" : "light";
  const darkTheme = createMuiTheme({
    palette: {
      type: palletType,
      // primary: {
      //   main: mainPrimaryColor
      // },
      // secondary: {
      //   main: mainSecondaryColor
      // }
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
