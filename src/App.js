import React from "react";
import { connect } from "react-redux";
import Routes from "./Routes/Routes.js";
import Navbar from "./Components/Navbar/Navbar.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

function App(props) {
  const palletType = props.darkState ? "dark" : "light";
  console.log("DarkMode:", props.darkState);

  const darkTheme = createMuiTheme({
    typography: {
      fontFamily: ["Quantico", "sans-serif"].join(","),
    },
    palette: {
      type: palletType,
      primary: {
        // main: "#00338F",
        main: "#0F192C",
      },
      // background: {
      //   default: "#222222",
      // },
      secondary: {
        main: "#D2AF39",
      },
      info: {
        main: "#878787",
        light: "#FFFFFF",
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
