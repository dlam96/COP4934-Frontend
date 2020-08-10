import React from "react";
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";
import clsx from "clsx";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./data.js";
import "react-big-calendar/lib/css/react-big-calendar.css";

const useStyles = makeStyles((theme) => ({
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

export default function CurrentSchedule() {
  const classes = useStyles();
  // force paper height to be fixed
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  // let allViews = Object.keys(Views).map(k => Views[k])
  const localizer = momentLocalizer(moment);

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "82vh" }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
