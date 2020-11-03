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
    margin: '5px',
    background: '#7E7A79',
    height: '175px',
    width: '97%',
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

  const modelIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 8);
    return res;
  }

  return( 
    <Paper className={classes.paper}>
      <div className={classes.modelInfo}>
        <Grid item>
          <Typography gutterBottom variant='h5'>
            {aircraft.model_name}
          </Typography>
        </Grid>
        <Grid container item direction='row'>
          <Grid item md={6}>
            <Typography variant='body2'>
              Model id: {modelIdSlice(aircraft.model_uuid)}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant='body2'>
              Max crew: {aircraft.positions.length}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.editBt}>
        <Button
          variant="contained"
          size="small"
          onClick={() => props.handleModelEdit(aircraft)}
        >
          Details
        </Button>
      </div>
    </Paper>
  )
}