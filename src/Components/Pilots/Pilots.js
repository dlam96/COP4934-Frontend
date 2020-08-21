import React, { useEffect } from "react";
import clsx from "clsx";
import axios from 'axios';
import { Container, Grid, Paper, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
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

export default function Pilots() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  useEffect(() => {
    axios.get('/approval')
      .then((response) => {
        console.log("Pilots:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }, [])

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>
          <Paper className={fixedHeightPaper}>
            <p> Pilots </p>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
