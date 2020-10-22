import React from 'react'
import { 
  Paper, 
  makeStyles,
  Grid,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: '#b7b7b7',
    color: '#000000',
    margin: '3px',
    width:'100%',
  },
}));

export default function ActiveAircrafts(props) {
  const classes = useStyles();
  const { aircraft } = props;

  return( 
    <Paper className={classes.paper}>
      <Grid container>
        <Grid item xs={2} align="start"> { aircraft.craftId } </Grid>
        <Grid item xs={2} align="start"> { aircraft.aircraft } </Grid>
        <Grid item xs={1} align="start"> { aircraft.numCrew } </Grid>
        <Grid item xs={3} align="start"> { aircraft.aStatus } </Grid>
        <Grid item xs={4} align="right">
          <Button 
            variant="contained"
            size="small" 
            onClick={() => props.handleEdit(aircraft)}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}