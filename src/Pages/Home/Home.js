import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import CurrentSchedule from "../../Components/CurrentSchedule/CurrentSchedule.js";
import CreateSchedule from "../../Components/CreateSchedule/CreateSchedule.js";
import Users from "../../Components/Users/Users.js";
import Aircrafts from "../../Components/Aircrafts/Aircrafts.js";
import Sidebar from "../../Components/Sidebar/Sidebar.js";
import Profile from "../../Components/Profile/Profile.js";
import Messages from "../../Components/Messages/Messages.js";
import { connect } from "react-redux";
import { CssBaseline, Toolbar } from "@material-ui/core";
import {
  setAircrafts,
  setLocations,
  setCrewPostions,
  setAirmen,
  setAircraftModels,
  setFlights,
} from "../../Redux/actions.js";
import axios from "axios";
import moment from "moment";
import WebSocket from "../../Components/WebSocket/WebSocket.js";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  // content: {
  //   flexGrow: 1,
  //   padding: theme.spacing(3),
  // },
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Home(props) {
  const classes = useStyles();
  const [events, setEvents] = useState(null);
  const {
    aircraftAction,
    locationAction,
    crewPositionAction,
    airmenAction,
    aircraftModelAction,
    flightAction,
  } = props;


  useEffect(() => {
    let firstDay = moment().utc().startOf("month").format();
    let lastDay = moment().utc().endOf("month").format();

    console.log("FirstDay", firstDay);
    console.log("LastDay", lastDay);
    axios
      .get("/essential", { params: { start: firstDay, end: lastDay } })
      .then((response) => {
        console.log("Response Data:", response.data);
        aircraftAction(response.data.aircrafts);
        locationAction(response.data.locations);
        airmenAction(response.data.airmen);
        aircraftModelAction(response.data.aircraft_models);
        flightAction(response.data.flights);
        crewPositionAction(response.data.crew_positions);

        // Since backend gives us UTC, we can easily convert UCT to our browser time zone just by converting it to a Date Object
        response.data.flights.forEach((item) => {
          item.start = moment(item.start).toDate();
          item.end = moment(item.end).toDate();
        });
        setEvents(response.data.flights);
      })
      .catch((error) => {
        console.log("Get Error:", error);
      });
  }, [
    aircraftAction,
    locationAction,
    airmenAction,
    aircraftModelAction,
    flightAction,
    crewPositionAction,
  ]);


  return (
    <div className={classes.root}>
      <CssBaseline />
      <WebSocket />

      <Sidebar />
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        {/* Toolbar is just to pad */}
        <Toolbar />
        <Switch>
          <Route exact path="/Home/Schedule">
            {events ? 
              <CurrentSchedule events={events} />
              : 
              null
            }
          </Route>
          <Route exact path="/Home/CreateSchedule">
            <CreateSchedule />
          </Route>
          <Route exact path="/Home/Users">
            <Users />
          </Route>
          <Route exact path="/Home/Aircrafts">
            <Aircrafts />
          </Route>
          <Route exact path="/Home/Profile">
            <Profile />
          </Route>
          <Route exact path="/Home/Messages">
            <Messages />
          </Route>
        </Switch>
        {/* <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <p> test </p>
              </Paper>
            </Grid>
          </Grid>
        </Container> */}
      </main>
    </div>
  );
}


const mapDispatchToProps = {
  aircraftAction: setAircrafts,
  locationAction: setLocations,
  crewPositionAction: setCrewPostions,
  airmenAction: setAirmen,
  aircraftModelAction: setAircraftModels,
  flightAction: setFlights,
};


const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);
