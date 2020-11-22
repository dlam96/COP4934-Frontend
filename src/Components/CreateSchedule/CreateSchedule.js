import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  Typography,
  Divider,
  Toolbar,
  Tooltip,
  Box,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import clsx from "clsx";
// calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import events from "./event.js";
import MomentUtils from "@date-io/moment";

import PreviewToolbar from "./PreviewToolbar.js";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  content: {
    // flexGrow: 1,
    // height: "100vh",
    // overflow: "auto",/
  },
  container: {
    // paddingTop: theme.spacing(4),
    // paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    flexGrow: 1,
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    minHeight: "90vh",
    maxHeight: "100%",
    height: "100%",
    // height: "calc(100% - 15px)", //height of toolbar if you know it beforehand
  },
  toolbar: {
    // margin: "auto",
    justifyContent: "center",
    color: "white",
    backgroundColor: theme.palette.primary.main,
    textAlign: "center",
  },
  timeStyle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
}));

export default function CreateSchedule() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const localizer = momentLocalizer(moment);

  let today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  // Calender functions
  const handleStartDateSelect = (date) => {
    if (date._d > endDate) {
      setEndDate(moment(date).toDate());
    }
    setStartDate(moment(date).toDate());
  };

  const handleEndDateSelect = (date) => {
    if (date._d < startDate) {
      setStartDate(moment(date).toDate());
    }
    setEndDate(moment(date).toDate());
  };

  return (
    <Container
      maxWidth="lg"
      className={classes.container}
      disableGutters={true}
    >
      <Grid container>
        {/* Constraint parameters */}
        <Grid item xs={12} md={4} lg={4}>
          <Paper className={fixedHeightPaper}>
            <Typography variant="h5">Schedule Constraints</Typography>
            <Divider />
            {/* =========================================
            Time Window 
            =========================================*/}
            <Tooltip
              title="Allocated time where events can occur"
              placement="bottom-start"
            >
              <Typography variant="subtitle1" style={{ paddingTop: "5px" }}>
                Time Interval
                <Help fontSize="small" style={{ paddingTop: "5px" }} />
              </Typography>
            </Tooltip>
            <Divider />
            <Grid container item direction="row">
              <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils}>
                {/* Use Format for visual formatting */}
                <Grid>
                  <TimePicker
                    autoOk
                    ampm={false}
                    label="Start Time"
                    variant="inline"
                    value={startDate}
                    onChange={(date) => handleStartDateSelect(date)}
                    className={classes.timeStyle}
                  />
                  <TimePicker
                    autoOk
                    ampm={false}
                    label="End Time"
                    variant="inline"
                    value={endDate}
                    onChange={(date) => handleEndDateSelect(date)}
                    className={classes.timeStyle}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            {/* =========================================
            End of Time Window 
            =========================================*/}
          </Paper>
        </Grid>
        {/* Preview window */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <Calendar
              selectable
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "82vh", width: "100%" }}
              defaultView="week"
              components={{ toolbar: PreviewToolbar }}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
