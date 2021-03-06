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

export default function AircraftCrew(props) {
  const classes = useStyles();
  const { position } = props;

  const positionIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 5);
    return res;
  }

  return( 
    <Paper className={classes.paper}>
      <div className={classes.modelInfo}>
        <Grid item>
          <Typography gutterBottom variant='h5'>
            {position.position}
          </Typography>
        </Grid>
        <Grid container item direction='row'>
          <Grid item md={6}>
            <Typography variant='body2'>
              Position id: {positionIdSlice(position.crew_position_uuid)}
            </Typography>
          </Grid>
          <Grid item md={6}>
            <Typography variant='body2'>
              Required: {position.required ? 'Yes' : 'No'}
            </Typography>
          </Grid>
        </Grid>
      </div>
      <Divider variant='middle' />
      <div className={classes.editBt}>
        <Button
          variant="contained"
          size="small"
          onClick={() => props.handleCrewEdit(position)}
        >
          Edit
        </Button>
      </div>
    </Paper>
  )
}