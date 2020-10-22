import React from 'react'
import { 
  Paper, 
  makeStyles,
  Grid,
  Button,
  Divider,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: '#7E7A79',
    height: '175px',
    width: '100%',
  },
  editBt: {
    margin: theme.spacing(2),
  },
  modelInfo: {
    margin: theme.spacing(2),
  },
}));

export default function AircraftModels(props) {
  const classes = useStyles();
  const { aircraft } = props;

  return( 
    <Grid item xs={3} sm={6}>
      <Paper className={classes.paper}>
        <div className={classes.modelInfo}>
          <Grid item>
            <Typography gutterBottom variant='h5'>
              {aircraft.aircraft}
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant='body2'>
              Max crew: {aircraft.numCrew}
            </Typography>
          </Grid>
        </div>
        <Divider variant='middle' />
        <div className={classes.editBt}>
          <Button
            variant="contained"
            size="small"
            onClick={() => props.handleModelEdit(aircraft)}
          >
            Edit
          </Button>
        </div>
      </Paper>
    </Grid>
  )
}