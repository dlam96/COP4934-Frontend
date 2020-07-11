import React, { useState } from "react";
import { connect } from "react-redux";
import clsx from "clsx";
import {
  CssBaseline,
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Container,
  Grid,
  Paper,
} from "@material-ui/core";
import {
  CalendarToday,
  Create,
  People,
  LocalAirport,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
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
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const routes = [
    { route: "Current Schedule", icon: "CalendarToday" },
    { route: "Create Schedule", icon: "Create" },
    { route: "Pilots", icon: "People" },
    { route: "Aircrafts", icon: "LocalAirport" },
  ];
  const handleClick = (key) => {
    console.log("handling click", key);
  };
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {/* map json array to list */}
            {routes.map((key, index) => (
              <div key={key.route}>
                <ListItem button onClick={() => handleClick(key.route)}>
                  <ListItemIcon>
                    {(() => {
                      switch (key.icon) {
                        case "CalendarToday":
                          return <CalendarToday />;
                        case "Create":
                          return <Create />;
                        case "People":
                          return <People />;
                        case "LocalAirport":
                          return <LocalAirport />;
                        default:
                          return null;
                      }
                    })()}
                  </ListItemIcon>
                  <ListItemText primary={key.route} />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </div>
      </Drawer>
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
