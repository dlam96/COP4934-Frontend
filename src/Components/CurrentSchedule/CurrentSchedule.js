import React, { useState } from "react";
import {
  Container,
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
  InputAdornment,
  ListItemIcon,
} from "@material-ui/core";
import { Close, LocalOffer, LocalAirport, Room } from "@material-ui/icons";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import data from "./data.js";
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
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "75ch",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "25ch",
  },
  menuPaper: {
    // width: "15ch",
  },
  submitBtn: {
    paddingLeft: theme.spacing(3),
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

export default function CurrentSchedule() {
  const classes = useStyles();
  const [events, setEvents] = useState(data);
  const [title, setTitle] = useState("");
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [open, setOpen] = useState(false);
  // Modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  // adds new event to JSON object
  // TODO: check for empty strings/fields
  // TODO: check for start/endDate ranges
  const onSubmit = () => {
    console.log(
      "aircraft",
      airCraftOptions[selectedIndex].aircraft,
      "title",
      title,
      "start",
      startDate,
      "end",
      endDate
    );
    const newEvents = [
      ...events,
      { title: title, start: startDate, end: endDate },
    ];
    setEvents(newEvents);
    handleClose();
  };
  // Calendar function
  const localizer = momentLocalizer(moment);
  const handleSelect = ({ start, end }) => {
    console.log("start", start, "end", end);

    setStart(moment(start).format("YYYY-MM-DD hh:mm A"));
    setEnd(moment(end).format("YYYY-MM-DD hh:mm A"));

    handleOpen();
  };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          {/* Modal */}
          <form>
            <div className={classes.modalPaper}>
              {/* Dropdown menu */}
              <div id="Airspace-dropdown" className={classes.menuPaper}>
                <Grid container direction="row">
                  {/* Aircraft  menu */}
                  <Grid item xs={5}>
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
                          secondary={airCraftOptions[selectedIndex].aircraft}
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
                          onClick={(event) => handleMenuItemClick(event, index)}
                        >
                          {airCraftOptions.aircraft}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Grid>
                  {/* Airspace menu */}
                  <Grid item xs={5}>
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
                          secondary={airSpaceOptions[selectedIndex2].airspace}
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
                  {/* Close button */}
                  <Grid item xs={2} className={classes.submitBtn}>
                    <IconButton aria-label="close" onClick={handleClose}>
                      <Close />
                    </IconButton>
                  </Grid>
                </Grid>
              </div>
              <TextField
                label="Title"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocalOffer />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
              <TextField
                label="Label"
                style={{ margin: 8 }}
                placeholder="Placeholder"
                // helperText="Full width!"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              {/* Start Date/Time picker */}
              <TextField
                label="Start date"
                id="margin-normal"
                type="datetime-local"
                defaultValue={startDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setStart(moment(e.target.value).format("YYYY-MM-DDTHH:mm"));
                }}
                margin="dense"
              />
              {/* End Date/Time picker */}
              <TextField
                label="End date"
                id="margin-normal"
                type="datetime-local"
                defaultValue={endDate}
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  setEnd(moment(e.target.value).format("YYYY-MM-DDTHH:mm"));
                }}
                margin="dense"
              />
              <div id="submit-btn" className={classes.submitBtn}>
                <Chip
                  type="submit"
                  label="Submit"
                  color="primary"
                  clickable
                  onClick={onSubmit}
                />
              </div>
            </div>
          </form>
        </Fade>
      </Modal>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12} lg={12}>
          <Paper>
            <Calendar
              selectable
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              style={{ height: "82vh" }}
              onSelectSlot={handleSelect}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
