import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  Typography,
  Divider,
  Tooltip,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Chip,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemSecondaryAction,
  CircularProgress,
  TextField,
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import clsx from "clsx";

import { setFlights, setSchedule } from "../../Redux/actions.js";
// calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import events from "./event.js";
import MomentUtils from "@date-io/moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import PreviewToolbar from "./PreviewToolbar.js";
import {
  TimePicker,
  DatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

// Redux
import { connect } from "react-redux";

import { WebSocketFrame } from "../WebSocket/WebSocket.js";

const DragAndDropCalendar = withDragAndDrop(Calendar);

const useStyles = makeStyles((theme) => ({
  content: {
    // flexGrow: 1,
    // height: "100vh",
    // overflow: "auto",/
  },
  container: {
    width: "100%",
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
    minHeight: "92vh",
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
  largeDateStyle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  timeStyle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  durationStyle: {
    margin: theme.spacing(1, 0, 1, 1),
    width: "30%",
  },
  durationLabel: {
    width: "30vw",
  },
  numberFlightsStyle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  chip: {
    margin: theme.spacing(1),
  },
  listStyle: {
    maxHeight: 250,
    overflow: "auto",
  },
  buttonWrapper: {
    padding: theme.spacing(1),
  },
}));

function CreateSchedule(props) {
  const classes = useStyles();
  // Loading variables
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  // const timer = React.useRef();

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const localizer = momentLocalizer(moment);
  // dates
  let today = new Date();
  let nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  // get first and last day of NEXT week
  let first = nextWeek.getDate() - nextWeek.getDay(); // First day is the day of the month - the day of the week
  let last = first + 6; // last day is the first day + 6
  let firstday = new Date(nextWeek.setDate(first)).setHours(0, 0, 0, 0);
  let lastday = new Date(nextWeek.setDate(last)).setHours(23, 59, 59, 59);

  const [startDate, setStartDate] = useState(moment(firstday).toDate());
  const [endDate, setEndDate] = useState(moment(lastday).toDate());

  const [flightDuration, setFlightDuration] = useState("4");
  const durationOptions = ["1", "2", "3", "4", "5", "6", "7", "8"];

  let propsAircraftModels = props.aircraft_models;
  const [aircraftModels, setAircraftModels] = useState(propsAircraftModels);
  let propsAirmen = props.airmen;
  const [flightCrew, setFlightCrew] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
  const [numFlights, setNumFlights] = useState(1);
  const [numFlightsError, setNumFlightsError] = useState(false);
  // console.log("schedule", props.schedule);

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

  const handleFlightDurationSelect = (event) => {
    setFlightDuration(event.target.value);
  };

  const handleAircraftChange = (data) => {
    // console.log("TEST");
    console.log("aircraft delete", data);
    let newAirCraftModel = [...aircraftModels];

    const index = newAirCraftModel.findIndex(
      (obj) => obj.model_name === data.model_name
    );
    // console.log("index", index);
    // // // does exit then remove from array
    if (!newAirCraftModel[index].blacklist) {
      console.log("adding aircraft to blacklist");

      newAirCraftModel[index].blacklist = true;
    } else {
      console.log("removing aircraft from blacklist");
      newAirCraftModel[index].blacklist = false;
    }
    console.log("aircraft models", newAirCraftModel);
    setAircraftModels(newAirCraftModel);
  };

  const handleAirCrewToggle = (value) => () => {
    let blacklist_airmen = [...flightCrew];
    const currentIndex = checked.indexOf(value);

    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
      blacklist_airmen.push(value.account_uuid);
    } else {
      newChecked.splice(currentIndex, 1);
      blacklist_airmen.splice(currentIndex, 1);
    }

    setChecked(newChecked);
    setFlightCrew(blacklist_airmen);
  };

  const handleGenerateSchedule = (event) => {
    // console.log("generate event", event);
    if (!loading) {
      setSuccess(false);
      setLoading(true);

      let whitelist_models = [];
      for (let model in aircraftModels) {
        if (!aircraftModels[model].blacklist)
          whitelist_models.push(aircraftModels[model].model_uuid);
      }
      // console.log("Sending Start", startDate);
      // console.log("Sending End:", endDate);
      WebSocketFrame.generationHandler("generate", {
        start: startDate.toLocaleString(),
        end: endDate.toLocaleString(),
        duration: flightDuration,
        whitelist_models: whitelist_models,
        blacklist_airmen: flightCrew,
        num_flights: numFlights,
      });
    }
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    // console.log("Moving", event);
    // removes event from current events
    const newUpdatedEvent = [...generatedSchedule];
    const updatedEvents = newUpdatedEvent.filter(
      (item) => item.flight_uuid !== event.flight_uuid
    );
    // adds the new event w/ updated parameters
    const updatedEvent = { ...event, start, end, allDay: droppedOnAllDaySlot };
    updatedEvents.push(updatedEvent);
    setGeneratedSchedule(updatedEvents);
    props.setScheduleAction(updatedEvents);
  };
  // useEffect(() => {
  //   if (generatedSchedule) {
  //     console.log("setting schedule action");
  //     props.setScheduleAction(generatedSchedule);
  //   }
  // }, generatedSchedule);

  const handleCommitSchedule = () => {
    console.log("committing schedule", generatedSchedule);
    WebSocketFrame.commitHandler("add_many", {flights: generatedSchedule});
    props.setScheduleAction([]);
    // const mergedSchedules = props.flights.concat(generatedSchedule);
    // console.log("merged schedules", mergedSchedules);
    // props.flightAction(mergedSchedules);
  };

  const handleNumFlights = (event) => {
    console.log("number of flight", event.target.value);
    setNumFlightsError(false);
    if (event.target.value < 1 || event.target.value > 25) {
      setNumFlightsError(true);
      return;
    }
    setNumFlights(event.target.value);
  };
  // add blacklist object to aircraftmodels array
  useEffect(() => {
    // console.log("initializing blacklist");
    for (const aircraft in aircraftModels) {
      aircraftModels[aircraft].blacklist = false;
    }
  }, []);
  // useEffect(() => {
  // console.log("forcing rerender");
  // }, [aircraftModels]);

  useEffect(() => {
    // console.log("Airmen", ...propsAirmen);
  }, [propsAirmen]);

  useEffect(() => {
    if (props.schedule) {
      let generatedSchedule = [];
      if (props.schedule.flights) {
        generatedSchedule = [...props.schedule.flights];
        generatedSchedule.forEach((item) => {
          item.start = moment(item.start).toDate();
          item.end = moment(item.end).toDate();
        });
      } else if (props.schedule) {
        generatedSchedule = [...props.schedule];
        generatedSchedule.forEach((item) => {
          item.start = moment(item.start).toDate();
          item.end = moment(item.end).toDate();
        });
      }

      setGeneratedSchedule(generatedSchedule);
      setSuccess(true);
      setLoading(false);
    }
  }, [props.schedule]);

  const eventStyleGetter = (event) => {
    // console.log("prop e", event);
    var style = {
      backgroundColor: event.color,
      borderRadius: "7px",
      opacity: 1,
      // color: "white",
      border: "0px",
      display: "block",
    };
    return {
      style: style,
    };
  };

  return (
    <Container
      maxWidth={false}
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
                  <DatePicker
                    autoOk
                    disableToolbar
                    label="Start Date"
                    variant="inline"
                    value={startDate}
                    onChange={(date) => handleStartDateSelect(date)}
                    className={classes.largeDateStyle}
                  />
                  <TimePicker
                    autoOk
                    ampm={false}
                    label="Start Time"
                    variant="inline"
                    value={startDate}
                    onChange={(date) => handleStartDateSelect(date)}
                    className={classes.timeStyle}
                  />
                  <DatePicker
                    autoOk
                    disableToolbar
                    label="End Date"
                    variant="inline"
                    value={endDate}
                    onChange={(date) => handleEndDateSelect(date)}
                    className={classes.largeDateStyle}
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
            {/* =========================================
            Flight Duration Window 
            =========================================*/}
            <Grid container item direction="row">
              <Grid item xs={5}>
                <Tooltip
                  title="Duration of a flight event"
                  placement="bottom-start"
                >
                  <Typography variant="subtitle1" style={{ paddingTop: "5px" }}>
                    Flight Constraint
                    <Help fontSize="small" style={{ paddingTop: "5px" }} />
                  </Typography>
                </Tooltip>
                <Divider />
                <Grid container item direction="column">
                  {/* duration */}
                  <FormControl className={classes.durationStyle}>
                    <InputLabel
                      id="duration-select-label"
                      className={classes.durationLabel}
                    >
                      Duration (Hours)
                    </InputLabel>
                    <Select
                      labelId="flight-duration-select-label"
                      id="flight-duration"
                      value={flightDuration}
                      onChange={handleFlightDurationSelect}
                    >
                      {durationOptions.map((item, index) => (
                        <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {/* Numb of flights */}
                  <FormControl className={classes.numberFlightsStyle}>
                    <TextField
                      error={numFlightsError}
                      label="Number of Flights"
                      InputLabelProps={{ shrink: true }}
                      placeholder="1 - 25"
                      onChange={handleNumFlights}
                      helperText={numFlightsError ? "Invalid range." : null}
                    />
                  </FormControl>
                </Grid>
              </Grid>
              {/* =========================================
            End of Flight Duration Window 
            =========================================*/}
              {/* =========================================
            Blacklist Aircraft Window 
            =========================================*/}
              <Grid item xs={7}>
                <Tooltip
                  title="Aircraft models to be included in schedule"
                  placement="bottom-start"
                >
                  <Typography variant="subtitle1" style={{ paddingTop: "5px" }}>
                    Aircraft Model
                    <Help fontSize="small" style={{ paddingTop: "5px" }} />
                  </Typography>
                </Tooltip>
                <Divider />
                <Grid container direction="row">
                  {aircraftModels.map((data, index) => {
                    return (
                      <Chip
                        size="small"
                        clickable
                        onClick={() => handleAircraftChange(data)}
                        variant={
                          !aircraftModels[index].blacklist
                            ? "default"
                            : "outlined"
                        }
                        color={
                          !aircraftModels[index].blacklist
                            ? "primary"
                            : "default"
                        }
                        key={data.model_name}
                        label={data.model_name}
                        className={classes.chip}
                      />
                    );
                  })}
                </Grid>
              </Grid>
              {/* =========================================
            End of Blacklist Aircraft Window 
            =========================================*/}
            </Grid>
            {/* =========================================
            Blacklist AirCrew Window 
            =========================================*/}
            {/* <Tooltip
              title="Aircrew members to blacklist"
              placement="bottom-start"
            >
              <Typography variant="subtitle1" style={{ paddingTop: "5px" }}>
                Blacklist Aircrew Members
                <Help fontSize="small" style={{ paddingTop: "5px" }} />
              </Typography>
            </Tooltip>
            <Divider />
            <Grid container>
              <Grid item xs={12}>
                <List className={classes.listStyle} dense>
                  {propsAirmen.map((value, index) => {
                    return (
                      <ListItem
                        key={index + value.first_name + value.last_name}
                      >
                        <ListItemText
                          id={index}
                          primary={`${value.first_name} ${value.last_name}`}
                        />
                        <ListItemSecondaryAction>
                          <Checkbox
                            edge="end"
                            onChange={handleAirCrewToggle(value)}
                            checked={checked.indexOf(value) !== -1}
                          />
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </Grid>
            </Grid> */}
            {/* =========================================
            End of Blacklist AirCrew Window 
            =========================================*/}
            {/* =========================================
            Buttons 
            =========================================*/}
            <Divider />
            <Grid container direction="row" className={classes.buttonWrapper}>
              <Chip
                label="Generate Schedule"
                avatar={
                  loading ? (
                    <CircularProgress
                      size={20}
                      style={{ backgroundColor: "transparent" }}
                    />
                  ) : null
                }
                clickable
                style={{ marginRight: 5 }}
                onClick={handleGenerateSchedule}
                color="primary"
              />
              <Chip
                label="Commit Schedule"
                clickable
                onClick={handleCommitSchedule}
                color={success ? "secondary" : "default"}
              />
            </Grid>
            {/* =========================================
            End of Buttons 
            =========================================*/}
          </Paper>
        </Grid>
        {/* Preview window */}
        <Grid item xs={12} md={8} lg={8}>
          <Paper className={fixedHeightPaper}>
            <DragAndDropCalendar
              // selectable
              localizer={localizer}
              events={generatedSchedule}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)}
              style={{ height: "82vh", width: "100%" }}
              defaultView="week"
              components={{
                toolbar: PreviewToolbar,
              }}
              eventPropGetter={eventStyleGetter}
              onEventDrop={moveEvent}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapDispatchToProps = {
  flightAction: setFlights,
  setScheduleAction: setSchedule,
};

const mapStateToProps = (state) => {
  return {
    aircraft_models: state.aircraftmodelReducer,
    airmen: state.airmenReducer.users,
    schedule: state.generationReducer,
    flights: state.flightReducer,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateSchedule);
