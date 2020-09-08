import React, { useEffect } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
  makeStyles,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
const useStyles = makeStyles((theme) => ({
  toolbar: {
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
  icons: {
    color: theme.palette.secondary.main,
  },
  disabledButton: {
    color: "white",
    // fontWeight: "bold",
    // backgroundColor: theme.palette.secondary.main,
    "&:disabled": {
      color: theme.palette.secondary.main,
    },
  },
}));
export default function CustomToolbar(props) {
  // console.log(props);
  const classes = useStyles();

  return (
    <Toolbar className={classes.toolbar}>
      <Grid container direction="row">
        <Grid item xs={4} container justify="flex-start">
          <IconButton onClick={() => props.onNavigate("PREV")}>
            <ChevronLeft className={classes.icons} />
          </IconButton>
          <Button
            onClick={() => props.onNavigate("TODAY")}
            style={{ color: "white" }}
          >
            TODAY
          </Button>
          <IconButton onClick={() => props.onNavigate("NEXT")}>
            <ChevronRight className={classes.icons} />
          </IconButton>
        </Grid>
        <Grid item container xs={4} justify="center" alignItems="center">
          <Typography variant="h5" style={{ textTransform: "capitalize" }}>
            {props.label}
          </Typography>
        </Grid>
        <Grid item container xs={4} justify="flex-end">
          <Button
            onClick={() => props.onView("month")}
            disabled={props.view === "month" ? true : false}
            // classes={{ disabled: classes.disabledButton }}
            className={classes.disabledButton}
          >
            MONTH
          </Button>
          <Button
            onClick={() => props.onView("week")}
            disabled={props.view === "week" ? true : false}
            className={classes.disabledButton}
          >
            WEEK
          </Button>
          <Button
            onClick={() => props.onView("day")}
            disabled={props.view === "day" ? true : false}
            className={classes.disabledButton}
          >
            DAY
          </Button>
          <Button
            onClick={() => props.onView("agenda")}
            disabled={props.view === "agenda" ? true : false}
            className={classes.disabledButton}
          >
            AGENDA
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
