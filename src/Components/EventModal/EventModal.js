import React, { useState, forwardRef, useImperativeHandle } from "react";
import {
  IconButton,
  Modal,
  Grid,
  Backdrop,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalPaper: {
    color: "#fff",
    backgroundColor: "#fff",
    // border: "2px solid #000",
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "100vw",
    height: "100vh",
  },
}));

const EventModal = forwardRef((props, selectedEventRef) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  // Modal functions
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useImperativeHandle(selectedEventRef, () => {
    return {
      handleOpen: handleOpen,
    };
  });

  return (
    <Modal
      open={open}
      className={classes.modal}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.modalPaper}>
        <Grid container direction="row">
          {/* Close button */}
          <Grid item xs={1} className={classes.submitBtn}>
            <IconButton aria-label="close" onClick={handleClose}>
              <Close />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </Modal>
  );
});
export default EventModal;
