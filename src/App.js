import React, { useEffect } from "react";
import { connect } from "react-redux";
import Routes from "./Routes/Routes.js";
import Navbar from "./Components/Navbar/Navbar.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import { setAircrafts, setLocations, setCrewPostions, setAirmen, setAircraftModels, setFlights } from "./Redux/actions.js";
// import "./App.css";

function App(props) {
  const palletType = props.darkState ? "dark" : "light";
  const {aircraftAction, locationAction, crewPositionAction, airmenAction, aircraftModelAction, flightAction} = props;
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

  useEffect(() => {
    let date = new Date(), y = date.getFullYear(), m = date.getMonth();
    let firstDay = new Date(y, m, 1);
    let lastDay = new Date(y, m + 1, 0, 23, 59, 59);
    axios.get('/essential', {params: {start: firstDay, end: lastDay}})
      .then((response) => {
        console.log("Response Data:", response.data);
        aircraftAction(response.data.aircrafts);
        locationAction(response.data.locations);
        airmenAction(response.data.airmen);
        aircraftModelAction(response.data.aircraft_models);
        flightAction(response.data.flights);
        crewPositionAction(response.data.crew_positions);
      })
      .catch((error) => {
        console.log("Get Error:", error);
      })
  }, [])

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

const mapDispatchToProps = {
  aircraftAction: setAircrafts,
  locationAction: setLocations,
  crewPositionAction: setCrewPostions,
  airmenAction: setAirmen,
  aircraftModelAction: setAircraftModels,
  flightAction: setFlights
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
