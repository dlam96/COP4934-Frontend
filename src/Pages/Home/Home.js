import React from "react";
// import Navbar from "../../Components/Navbar/Navbar.jsx";
import Sidebar from "../../Components/Sidebar/Sidebar.js";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  CssBaseline,
  Toolbar,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";

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
  // force paper height to be fixed
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Sidebar />
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        {/* Toolbar is just to pad */}
        <Toolbar />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <p> test </p>
              </Paper>
            </Grid>
          </Grid>
        </Container>
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
