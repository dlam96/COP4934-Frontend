import React from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  fixedInfo: {
    height: '100%',
    width: '100%',
    paddingTop: "50px",
    padding: theme.spacing(2),
  },
  buttons: {
    paddingTop: theme.spacing(2),
  },
  saveBt: {
    marginRight: "10px",
  },
}));

export default function EditAircraftModel(props) {
  const classes = useStyles();
  const { crewPositions, aircraft } = props;

  const getPositionName = ( position = null ) => {
    let index = crewPositions.findIndex((element) => element.crew_position_uuid === position.crew_position_uuid)
    return crewPositions[index].position;
  }

  return (
    <Paper className={classes.fixedInfo} variant="outlined">
      <Grid container item direct='column' spacing={2}>

       <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Model id</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ aircraft.model_uuid }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Model Name</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ aircraft.model_name }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Positions:</Grid>
          {aircraft.positions.map(pos => (
            <Grid item xs={12} align='center' key={pos.crew_position_uuid}>
              {getPositionName(pos)}
            </Grid>
          ))}
        </Grid>

        {/* Save and Cancel buttons */}
        <Grid container item>
          <Grid item xs={12} align="center" className={classes.buttons}>
            {/* <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              className={classes.saveBt}
              onClick={()=>props.handleModelEdit(aircraft)}
            >
              Save
            </Button> */}
            <Button
              variant="contained"
              onClick={()=>props.handleModelEdit()}
            >
              Back
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  )
}