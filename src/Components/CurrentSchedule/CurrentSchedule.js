import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  Modal,
  Fade,
  Backdrop,
} from "@material-ui/core";
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
  },
}));

export default function CurrentSchedule() {
  const classes = useStyles();
  // force paper height to be fixed
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  // let allViews = Object.keys(Views).map(k => Views[k])
  const localizer = momentLocalizer(moment);
  const handleSelect = ({ start, end, box }) => {
    console.log("start", start, "end", end, "box", box);
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
          <div className={classes.modalPaper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">
              react-transition-group animates me.
            </p>
          </div>
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
