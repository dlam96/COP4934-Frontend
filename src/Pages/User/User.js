import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { Container, CssBaseline, Toolbar } from "@material-ui/core";

import CurrentSchedule from "../../Components/CurrentSchedule/CurrentSchedule.jsx";
import CreateSchedule from "../../Components/CreateSchedule/CreateSchedule.jsx";
import Pilots from "../../Components/Pilots/Pilots.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.js";

const useStyles = makeStyles((theme) => ({
  userPortal: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function User(props) {
  const classes = useStyles();
 
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Sidebar />
      <Toolbar />
        <Switch>
          <Route exact path="/User/CurrentSchedule">
            <CurrentSchedule />
          </Route>
          <Route exact path="/User/CreateSchedule">
            <CreateSchedule />
          </Route>
          <Route exact path="/User/Pilots">
            <Pilots />
          </Route>
        </Switch>
      <div className={classes.userPortal}>
        <h1>User Portal</h1>
      </div>
    </Container>
  );
}


export default User;