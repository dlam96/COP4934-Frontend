import React, { useEffect } from "react";
import {
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Button,
} from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";

export default function CustomToolbar(props) {
  console.log(props);
  return (
    <Toolbar>
      <Grid container direction="row">
        <Grid item xs={4} container justify="flex-start">
          <IconButton onClick={() => props.onNavigate("PREV")}>
            <ChevronLeft />
          </IconButton>
          <Button onClick={() => props.onNavigate("TODAY")}>TODAY</Button>
          <IconButton onClick={() => props.onNavigate("NEXT")}>
            <ChevronRight />
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
          >
            MONTH
          </Button>
          <Button
            onClick={() => props.onView("week")}
            disabled={props.view === "week" ? true : false}
          >
            WEEK
          </Button>
          <Button
            onClick={() => props.onView("day")}
            disabled={props.view === "day" ? true : false}
          >
            DAY
          </Button>
          <Button
            onClick={() => props.onView("agenda")}
            disabled={props.view === "agenda" ? true : false}
          >
            agenda
          </Button>
        </Grid>
      </Grid>
    </Toolbar>
  );
}
