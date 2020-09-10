import React from 'react'
import { 
  Paper, 
  makeStyles,
  Button,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: '#b7b7b7',
    color: '#000000',
    margin: '3px',
  },
}));

export default function Maitenance(props) {
  const classes = useStyles();
  const { aircrafts } = props;

  return( 
    <Paper className={classes.paper}>
      <Grid container item direction="row">
        <Grid xs={3} align="start">
          { aircrafts.aircraft }
        </Grid>
        <Grid xs={3} align="start">
          { aircrafts.numCrew }
        </Grid>
        <Grid xs={6} align="start" />
      </Grid>
    </Paper>
  )

}