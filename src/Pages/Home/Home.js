import React from "react";
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

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Sidebar />
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        {/* Toolbar is just to pad */}
        <Toolbar />
        <Switch>
          <Route exact path="/Home/Schedule">
            <CurrentSchedule />
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

const mapStateToProps = (state) => {
  return {
    username: state.username,
  };
};

export default connect(mapStateToProps, null)(Home);
