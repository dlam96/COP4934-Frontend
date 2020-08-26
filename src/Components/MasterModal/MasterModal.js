import React, { useState, useEffect } from "react";
import {
  Grid,
  Paper,
  makeStyles,
  Modal,
  Fade,
  Backdrop,
  TextField,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Menu,
  Chip,
  IconButton,
  ListItemIcon,
  Checkbox,
  FormControl,
  FormControlLabel,
  Select,
  InputLabel,
  Tooltip,
} from "@material-ui/core";
import {
  Close,
  LocalAirport,
  Room,
  FiberManualRecord,
  CheckCircle,
} from "@material-ui/icons";
import { Autocomplete } from "@material-ui/lab";
import moment from "moment";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  TimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
// import data from "../CurrentSchedule/data.js";
import "react-big-calendar/lib/css/react-big-calendar.css";

moment.locale("en");

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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "scroll",
    height: "100%",
    width: "100%",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100vw",
    minHeight: "100vh",
    height: "100%",
  },
  menuPaper: {
    margin: theme.spacing(1, 3, 1, 3),
  },
  textField: {
    margin: theme.spacing(1, 1, 1, 3),
    width: "100%",
  },
  titleResize: {
    fontSize: 25,
  },
  descriptionResize: {
    backgroundColor: "#dadce0",
    padding: theme.spacing(3, 3, 3, 3),
    borderRadius: "5px",
  },
  dateStyle: {
    margin: theme.spacing(1, 1, 1, 3),
  },
  timeStyle: {
    margin: theme.spacing(1, 3, 1, 0),
  },
  submitBtn: {
    paddingLeft: theme.spacing(3),
  },
  pilotStyle: {
    width: "50vw",
    padding: theme.spacing(1, 1, 1, 3),
    "& > * + *": {
      marginTop: theme.spacing(3),
    },
  },
  colorPicker: {
    margin: theme.spacing(0, 0, 0, 5),
  },
  // small Modal css
  smallModalPaper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    borderRadius: "10px",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "40vw",
    height: "80%",
  },
  smallTitleResize: {
    fontSize: 20,
  },
  smallCloseBtn: {
    padding: theme.spacing(0, 1, 0, 0),
  },
  smallSubmitBtn: {
    margin: theme.spacing(1, 1, 1, 0),
  },
}));
// options for aircraft menu
const airCraftOptions = [
  { aircraft: "Aircraft 1", disabled: true },
  { aircraft: "Aircraft 2", disabled: false },
  { aircraft: "Aircraft 3", disabled: false },
  { aircraft: "Aircraft 4", disabled: false },
];
// options for airspace menu
const airSpaceOptions = [
  { airspace: "Moody AirForce Base", disabled: false },
  { airspace: "Airspace 2", disabled: false },
  { airspace: "Airspace 3", disabled: true },
  { airspace: "Airspace 4", disabled: false },
];
// options for pilots
const pilots = [
  {
    name: "Franz Ferdinand",
  },
  {
    name: "John Doe",
  },
  {
    name: "Jane Doe",
  },
];
export default function MasterModal(props) {
  const classes = useStyles();
  const [locale, setLocale] = useState("en");
  // const [events, setEvents] = useState(data);
  const [title, setTitle] = useState("");
  const [maximized, setMaximized] = useState(true);
  const [allDay, setAllDay] = useState(false);
  const [selectedPilots, setPilots] = useState(null);
  const [selectedColor, setColor] = useState("");

  useEffect(() => {
    setTitle(props.selectedEvent.title);
    setPilots(props.selectedEvent.selectedPilots);
    setAllDay(props.selectedEvent.allDay);
    if (props.selectedEvent.color) setColor(props.selectedEvent.color);
  }, [props.selectedEvent]);
  // Modal functions

  const handleClose = () => {
    // setOpen(false);
    props.handleClose();
    props.setShowAll(false);
    setMaximized(false);
  };
  // Aircraft Menu functions
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleClickListItem = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    console.log("menu select", index);
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  // Airspace Menu functions
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [selectedIndex2, setSelectedIndex2] = React.useState(0);

  const handleClickListItem2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleMenuItemClick2 = (event, index) => {
    console.log("menu select", index);
    setSelectedIndex2(index);
    setAnchorEl2(null);
  };

  const handleMenuClose2 = () => {
    setAnchorEl2(null);
  };

  // adds new event/edit existing event to JSON object
  // TODO: check for empty strings/fields
  const onSubmit = () => {
    console.log(
      "color",
      selectedColor,
      "id",
      props.selectedEvent.id - 1,
      "aircraft",
      airCraftOptions[selectedIndex].aircraft,
      "title",
      title,
      "start",
      props.startDate,
      "end",
      props.endDate,
      "all day",
      allDay,
      "pilots",
      selectedPilots
    );

    const objIndex = props.events.findIndex(
      (obj) => obj.id === props.selectedEvent.id
    );
    // if index exist > -1, then modify object else create new object in array
    if (objIndex >= 0) {
      props.events[objIndex] = {
        color: selectedColor,
        title: title,
        start: props.startDate,
        end: props.endDate,
        allDay: allDay ? allDay : false,
        airCraft: airCraftOptions[selectedIndex].aircraft,
        airSpace: airSpaceOptions[selectedIndex2].airspace,
        selectedPilots: selectedPilots,
      };
    } else {
      const newEvents = [
        ...props.events,
        {
          id: props.events.length * 31 + 1,
          color: selectedColor,
          title: title,
          start: props.startDate,
          end: props.endDate,
          allDay: allDay ? allDay : false,
          airCraft: airCraftOptions[selectedIndex].aircraft,
          airSpace: airSpaceOptions[selectedIndex2].airspace,
          selectedPilots: selectedPilots,
        },
      ];
      props.setEvents(newEvents);
    }
    // reset color to default for next event
    setColor("");
    handleClose();
  };
  // Calendar function

  const handleStartDateSelect = (date) => {
    if (date._d > props.endDate) {
      props.setEndDate(moment(date).toDate());
    }
    props.setStartDate(moment(date).toDate());
  };

  const handleEndDateSelect = (date) => {
    if (date._d < props.startDate) {
      props.setStartDate(moment(date).toDate());
    }
    props.setEndDate(moment(date).toDate());
  };

  const handleCheckbox = (event) => {
    console.log("checkbox", event.target.checked);
    setAllDay(event.target.checked);
  };
  const handlePilots = (event, value) => {
    // console.log(value, "pilot", value[0].name);
    setPilots(value);
  };
  // small modal functions
  const toggleOptions = () => {
    setMaximized(!maximized);
  };

  const handleColor = (event) => {
    console.log("color handle", event.target.value);
    setColor(event.target.value);
  };
  return (
    <>
      {props.showAll ? (
        <>
          {maximized ? (
            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={props.open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={props.open}>
                {/* Modal */}
                <form>
                  <Grid container className={classes.modalPaper}>
                    {/* Title and Close button */}
                    <Grid container item direction="row">
                      {/* Title */}
                      <Grid item xs={11}>
                        <TextField
                          label="Title"
                          placeholder="Add Title"
                          value={title ? title : ""}
                          className={classes.textField}
                          size="medium"
                          fullWidth
                          margin="normal"
                          InputLabelProps={{
                            shrink: true,
                          }}
                          InputProps={{
                            classes: {
                              input: classes.titleResize,
                            },
                          }}
                          onChange={(e) => {
                            setTitle(e.target.value);
                          }}
                        />
                      </Grid>
                      {/* Close button */}
                      <Grid item xs={1} className={classes.submitBtn}>
                        <IconButton aria-label="close" onClick={handleClose}>
                          <Close />
                        </IconButton>
                      </Grid>
                    </Grid>
                    {/* Date/Time */}
                    <Grid container item direction="row">
                      <Grid item xs={12}>
                        <MuiPickersUtilsProvider
                          libInstance={moment}
                          utils={MomentUtils}
                          locale={locale}
                        >
                          {/* Use Format for visual formatting */}
                          <DatePicker
                            autoOk
                            disableToolbar
                            variant="inline"
                            label="Start Date"
                            value={props.startDate}
                            onChange={(date) => handleStartDateSelect(date)}
                            className={classes.dateStyle}
                          />
                          {/* Use Format for visual formatting */}
                          {allDay ? null : (
                            <TimePicker
                              autoOk
                              ampm={false}
                              label="Start Time"
                              variant="inline"
                              value={props.startDate}
                              onChange={(date) => handleStartDateSelect(date)}
                              className={classes.timeStyle}
                            />
                          )}
                          {/* End Date/Time picker */}
                          {/* Use Format for visual formatting */}
                          <DatePicker
                            disableToolbar
                            autoOk
                            variant="inline"
                            label="End Date"
                            value={props.endDate}
                            onChange={(date) => handleEndDateSelect(date)}
                            className={classes.dateStyle}
                          />
                          {/* Use Format for visual formatting */}
                          {allDay ? null : (
                            <TimePicker
                              ampm={false}
                              autoOk
                              label="End Time"
                              variant="inline"
                              value={props.endDate}
                              onChange={(date) => handleEndDateSelect(date)}
                              className={classes.timeStyle}
                            />
                          )}
                        </MuiPickersUtilsProvider>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={allDay}
                              onChange={handleCheckbox}
                              color="primary"
                            />
                          }
                          label="All day"
                        />
                      </Grid>
                    </Grid>
                    {/* Dropdown menu */}
                    <Grid
                      item
                      container
                      direction="row"
                      className={classes.menuPaper}
                    >
                      {/* Aircraft  menu */}
                      <Grid item xs={6}>
                        <List component="nav" aria-label="Aircraft">
                          <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="Aircraft"
                            onClick={handleClickListItem}
                          >
                            <ListItemIcon>
                              <LocalAirport />
                            </ListItemIcon>
                            <ListItemText
                              primary="Aircraft"
                              secondary={
                                airCraftOptions[selectedIndex].aircraft
                              }
                            />
                          </ListItem>
                        </List>
                        <Menu
                          id="lock-menu"
                          anchorEl={anchorEl}
                          keepMounted
                          open={Boolean(anchorEl)}
                          onClose={handleMenuClose}
                        >
                          {airCraftOptions.map((airCraftOptions, index) => (
                            <MenuItem
                              key={airCraftOptions.aircraft}
                              disabled={airCraftOptions.disabled}
                              selected={index === selectedIndex}
                              onClick={(event) =>
                                handleMenuItemClick(event, index)
                              }
                            >
                              {airCraftOptions.aircraft}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Grid>
                      {/* Airspace menu */}
                      <Grid item xs={6}>
                        <List component="nav" aria-label="Airspace">
                          <ListItem
                            button
                            aria-haspopup="true"
                            aria-controls="lock-menu"
                            aria-label="Airspace"
                            onClick={handleClickListItem2}
                          >
                            <ListItemIcon>
                              <Room />
                            </ListItemIcon>
                            <ListItemText
                              primary="Airspace"
                              secondary={
                                airSpaceOptions[selectedIndex2].airspace
                              }
                            />
                          </ListItem>
                        </List>
                        <Menu
                          id="lock-menu"
                          anchorEl={anchorEl2}
                          keepMounted
                          open={Boolean(anchorEl2)}
                          onClose={handleMenuClose2}
                        >
                          {airSpaceOptions.map((airSpaceOptions, index) => (
                            <MenuItem
                              key={airSpaceOptions.airspace}
                              disabled={airSpaceOptions.disabled}
                              selected={index === selectedIndex2}
                              onClick={(event) =>
                                handleMenuItemClick2(event, index)
                              }
                            >
                              {airSpaceOptions.airspace}
                            </MenuItem>
                          ))}
                        </Menu>
                      </Grid>
                    </Grid>
                    {/* Pilots & color */}
                    <Grid item container direction="row">
                      <Grid item sm={6} md={6} xl={6}>
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pilots}
                          getOptionLabel={(option) => option.name}
                          value={selectedPilots ? selectedPilots : []}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Pilots"
                              placeholder="Add pilots"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          )}
                          onChange={handlePilots}
                          className={classes.pilotStyle}
                        />
                      </Grid>
                      {/*TODO: add tickmark icon when selected */}
                      <Grid item sm={4} md={4} xl={4}>
                        {/* Color picker */}
                        <FormControl className={classes.colorPicker}>
                          <InputLabel shrink>Color</InputLabel>
                          <Select
                            labelId="color-label"
                            id="color-select"
                            value={selectedColor}
                            onChange={handleColor}
                            displayEmpty
                            renderValue={(e) => {
                              console.log("color", e);
                              return e === "" || e === undefined ? (
                                <FiberManualRecord
                                  style={{ color: "#3174ad" }}
                                />
                              ) : (
                                <FiberManualRecord style={{ color: e }} />
                              );
                            }}
                          >
                            {/* red */}
                            <MenuItem value={"#f44336"}>
                              <Tooltip title="Tomato" placement="right-start">
                                {selectedColor === "#f44336" ? (
                                  <CheckCircle style={{ color: "#f44336" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#f44336" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                            {/* orange */}
                            <MenuItem value={"#FF5722"}>
                              <Tooltip
                                title="Tangerine"
                                placement="right-start"
                              >
                                {selectedColor === "#FF5722" ? (
                                  <CheckCircle style={{ color: "#FF5722" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#FF5722" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                            {/* yellow */}
                            <MenuItem value={"#FFC107"}>
                              <Tooltip title="Banana" placement="right-start">
                                {selectedColor === "#FFC107" ? (
                                  <CheckCircle style={{ color: "#FFC107" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#FFC107" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                            {/* green */}
                            <MenuItem value={"#4CAF50"}>
                              <Tooltip title="Sage" placement="right-start">
                                {selectedColor === "#4CAF50" ? (
                                  <CheckCircle style={{ color: "#4CAF50" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#4CAF50" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                            {/* blue */}
                            <MenuItem value={"#3174ad"}>
                              <Tooltip
                                title="Blueberry"
                                placement="right-start"
                              >
                                {selectedColor === "#3174ad" ? (
                                  <CheckCircle style={{ color: "#3174ad" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#3174ad" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                            {/* indigo */}
                            <MenuItem value={"#3F51B5"}>
                              <Tooltip title="Lavender" placement="right-start">
                                {selectedColor === "#3F51B5" ? (
                                  <CheckCircle style={{ color: "#3F51B5" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#3F51B5" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                            {/* Violet */}
                            <MenuItem value={"#9C27B0"}>
                              <Tooltip title="Grape" placement="right-start">
                                {selectedColor === "#9C27B0" ? (
                                  <CheckCircle style={{ color: "#9C27B0" }} />
                                ) : (
                                  <FiberManualRecord
                                    style={{ color: "#9C27B0" }}
                                  />
                                )}
                              </Tooltip>
                            </MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {/* Description*/}
                    <Grid item container direction="row">
                      <Grid item sm={6} md={6} xl={6}>
                        <TextField
                          // label="Label"
                          placeholder="Add description"
                          multiline
                          rows={8}
                          rowsMax={8}
                          margin="normal"
                          className={classes.textField}
                          // InputLabelProps={{
                          //   style:
                          //   padding: ""
                          // }}
                          InputProps={{
                            disableUnderline: true,
                            classes: {
                              input: classes.descriptionResize,
                            },
                          }}
                        />
                      </Grid>
                    </Grid>
                    <div id="submit-btn" className={classes.submitBtn}>
                      <Chip
                        type="submit"
                        label="Save"
                        color="primary"
                        clickable
                        onClick={onSubmit}
                      />
                    </div>
                  </Grid>
                </form>
              </Fade>
            </Modal>
          ) : (
            /* ==================================================
					SMALL MODAL
					================================================== */

            <Modal
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={props.open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={props.open}>
                {/* Modal */}
                <Paper>
                  <form>
                    <Grid container className={classes.smallModalPaper}>
                      {/* Title and Close button */}
                      <Grid container item direction="row">
                        {/* Title */}
                        <Grid item xs={11}>
                          <TextField
                            label="Title"
                            placeholder="Add title"
                            value={title ? title : ""}
                            // className={classes.textField}
                            size="medium"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            InputProps={{
                              classes: {
                                input: classes.smallTitleResize,
                              },
                            }}
                            onChange={(e) => {
                              setTitle(e.target.value);
                            }}
                          />
                        </Grid>
                        {/* Close button */}
                        <Grid item xs={1} className={classes.smallCloseBtn}>
                          <IconButton aria-label="close" onClick={handleClose}>
                            <Close fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      {/* Date/Time */}
                      <Grid container item direction="row">
                        <Grid item xs={12}>
                          <MuiPickersUtilsProvider
                            libInstance={moment}
                            utils={MomentUtils}
                            locale={locale}
                          >
                            {/* Use Format for visual formatting */}
                            <DatePicker
                              autoOk
                              disableToolbar
                              variant="inline"
                              label="Start Date"
                              value={props.startDate}
                              onChange={(date) => handleStartDateSelect(date)}
                              className={classes.dateStyle}
                            />
                            {/* Use Format for visual formatting */}
                            {allDay ? null : (
                              <TimePicker
                                autoOk
                                ampm={false}
                                label="Start Time"
                                variant="inline"
                                value={props.startDate}
                                onChange={(date) => handleStartDateSelect(date)}
                                className={classes.timeStyle}
                              />
                            )}
                            {/* End Date/Time picker */}
                            {/* Use Format for visual formatting */}
                            <DatePicker
                              disableToolbar
                              autoOk
                              variant="inline"
                              label="End Date"
                              value={props.endDate}
                              onChange={(date) => handleEndDateSelect(date)}
                              className={classes.dateStyle}
                            />
                            {/* Use Format for visual formatting */}
                            {allDay ? null : (
                              <TimePicker
                                ampm={false}
                                autoOk
                                label="End Time"
                                variant="inline"
                                value={props.endDate}
                                onChange={(date) => handleEndDateSelect(date)}
                                className={classes.timeStyle}
                              />
                            )}
                          </MuiPickersUtilsProvider>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={allDay}
                                onChange={handleCheckbox}
                                color="primary"
                              />
                            }
                            label="All day"
                          />
                        </Grid>
                      </Grid>
                      {/* Dropdown menu */}
                      <Grid container item direction="row">
                        {/* Aircraft  menu */}
                        <Grid item xs={6}>
                          <List component="nav" aria-label="Aircraft">
                            <ListItem
                              button
                              aria-haspopup="true"
                              aria-controls="lock-menu"
                              aria-label="Aircraft"
                              onClick={handleClickListItem}
                            >
                              <ListItemIcon>
                                <LocalAirport />
                              </ListItemIcon>
                              <ListItemText
                                primary="Aircraft"
                                secondary={
                                  airCraftOptions[selectedIndex].aircraft
                                }
                              />
                            </ListItem>
                          </List>
                          <Menu
                            id="lock-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleMenuClose}
                          >
                            {airCraftOptions.map((airCraftOptions, index) => (
                              <MenuItem
                                key={airCraftOptions.aircraft}
                                disabled={airCraftOptions.disabled}
                                selected={index === selectedIndex}
                                onClick={(event) =>
                                  handleMenuItemClick(event, index)
                                }
                              >
                                {airCraftOptions.aircraft}
                              </MenuItem>
                            ))}
                          </Menu>
                        </Grid>
                        {/* Airspace menu */}
                        <Grid item xs={6}>
                          <List component="nav" aria-label="Airspace">
                            <ListItem
                              button
                              aria-haspopup="true"
                              aria-controls="lock-menu"
                              aria-label="Airspace"
                              onClick={handleClickListItem2}
                            >
                              <ListItemIcon>
                                <Room />
                              </ListItemIcon>
                              <ListItemText
                                primary="Airspace"
                                secondary={
                                  airSpaceOptions[selectedIndex2].airspace
                                }
                              />
                            </ListItem>
                          </List>
                          <Menu
                            id="lock-menu"
                            anchorEl={anchorEl2}
                            keepMounted
                            open={Boolean(anchorEl2)}
                            onClose={handleMenuClose2}
                          >
                            {airSpaceOptions.map((airSpaceOptions, index) => (
                              <MenuItem
                                key={airSpaceOptions.airspace}
                                disabled={airSpaceOptions.disabled}
                                selected={index === selectedIndex2}
                                onClick={(event) =>
                                  handleMenuItemClick2(event, index)
                                }
                              >
                                {airSpaceOptions.airspace}
                              </MenuItem>
                            ))}
                          </Menu>
                        </Grid>
                      </Grid>
                      {/* Pilots */}
                      <Grid container item direction="row">
                        <Autocomplete
                          multiple
                          id="tags-standard"
                          options={pilots}
                          getOptionLabel={(option) => option.name}
                          onChange={handlePilots}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              label="Pilots"
                              placeholder="Add pilots"
                              InputLabelProps={{
                                shrink: true,
                              }}
                            />
                          )}
                          className={classes.pilotStyle}
                          value={selectedPilots ? selectedPilots : []}
                        />
                      </Grid>
                      {/* Buttons */}
                      <Grid container item direction="row">
                        <Chip
                          type="more options"
                          label="More options"
                          color="default"
                          clickable
                          onClick={toggleOptions}
                          className={classes.smallSubmitBtn}
                        />
                        <Chip
                          type="submit"
                          label="Save"
                          color="primary"
                          clickable
                          onClick={onSubmit}
                          className={classes.smallSubmitBtn}
                        />
                      </Grid>
                    </Grid>
                  </form>
                </Paper>
              </Fade>
            </Modal>
          )}
        </>
      ) : null}
    </>
  );
}
