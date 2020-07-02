import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Routes from "./Routes/Routes.js";
import Navbar from "./Components/Navbar/Navbar.jsx";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
// import "./App.css";

function App() {
  const [darkState, setDarkState] = useState(false);
  const palletType = darkState ? "dark" : "light";
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
  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <Navbar theme={darkState} action={handleThemeChange} />
        <Routes />
      </div>
    </ThemeProvider>
  );
}

export default App;
