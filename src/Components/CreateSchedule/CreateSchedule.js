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
} from "@material-ui/core";
import { Help } from "@material-ui/icons";
import clsx from "clsx";
// calendar imports
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
// import events from "./event.js";
import MomentUtils from "@date-io/moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";

import PreviewToolbar from "./PreviewToolbar.js";
import { TimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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
  timeStyle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  durationStyle: {
    margin: theme.spacing(1, 0, 1, 1),
  },
  durationLabel: {
    width: "30vw",
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

  let today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [flightDuration, setFlightDuration] = useState(4);
  const durationOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  let propsAircraftModels = props.aircraft_models;
  const [aircraftModels, setAircraftModels] = useState(propsAircraftModels);
  let propsAirmen = props.airmen;
  const [flightCrew, setFlightCrew] = useState([]);
  const [checked, setChecked] = React.useState([1]);
  const [generatedSchedule, setGeneratedSchedule] = useState([]);
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
    setFlightDuration(event);
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

      WebSocketFrame.generationHandler("generate", {
        start: startDate,
        end: endDate,
        duration: flightDuration,
        whitelist_models: whitelist_models,
        blacklist_airmen: flightCrew,
      });
      setSuccess(true);
      setLoading(false);
      // timer.current = window.setTimeout(() => {
      //   setSuccess(true);
      //   setLoading(false);
      // }, 2500);
    }
    if (props.schedule) {
      let generatedSchedule = [...props.schedule.flights];
      generatedSchedule.forEach((item) => {
        item.start = moment(item.start).toDate();
        item.end = moment(item.end).toDate();
      });
      setGeneratedSchedule(generatedSchedule);
    }
  };

  const moveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }) => {
    // console.log("Moving", event);
    // removes event from current events
    const updatedEvents = generatedSchedule.filter(
      (item) => item.flight_uuid !== event.flight_uuid
    );
    // adds the new event w/ updated parameters
    const updatedEvent = { ...event, start, end, allDay: droppedOnAllDaySlot };
    updatedEvents.push(updatedEvent);
    setGeneratedSchedule(updatedEvents);
  };

  // add blacklist object to aircraftmodels array
  useEffect(() => {
    console.log("initializing blacklist");
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
                    Flight Duration
                    <Help fontSize="small" style={{ paddingTop: "5px" }} />
                  </Typography>
                </Tooltip>
                <Divider />

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
                    {durationOptions.map((value, index) => (
                      <MenuItem key={index} value={value}>
                        {value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
            <Tooltip
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
            </Grid>
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
                avatar={loading ? <CircularProgress size={20} /> : null}
                clickable
                style={{ marginRight: 5 }}
                onClick={handleGenerateSchedule}
                color="primary"
              />
              <Chip
                label="Commit Schedule"
                clickable
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
              style={{ height: "82vh", width: "100%" }}
              defaultView="week"
              components={{ toolbar: PreviewToolbar }}
              eventPropGetter={eventStyleGetter}
              onEventDrop={moveEvent}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    aircraft_models: state.aircraftmodelReducer,
    airmen: state.airmenReducer.users,
    schedule: state.generationReducer,
  };
};

export default connect(mapStateToProps, null)(CreateSchedule);
