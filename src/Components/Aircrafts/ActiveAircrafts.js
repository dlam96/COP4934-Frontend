import React from "react";
import { 
  makeStyles,
  Grid,
  Divider,
  IconButton,
  fade
} from "@material-ui/core";
import {
  Edit,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  details: {
    height: '40px',
    margin: '10px',
    marginLeft: '10px',
    alignItems: 'center',
    alignContent: 'center',
  },
  divBar: {
    width: '5px',
    height: '100%',
    marginRight: '15%',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  editButton: {
    color: theme.palette.secondary.main,
  },
}));

export default function ActiveAircrafts(props) {
  const classes = useStyles();
  const { aircraft, aircraftModels } = props;

  const getModelName = ( aircraft = null ) => {
    let index = aircraftModels.findIndex((element) => element.model_uuid === aircraft.model_uuid)
    if (index < 0) return;
    return aircraftModels[index].model_name;
  }

  return( 
    <Grid container item direction='row' className={classes.details}>
      <Grid item className={classes.divBar} />
      <Grid item style={{ background: 'red' }}> { aircraft.tail_code } </Grid>
      <Grid item xs={3} style={{ background: 'green', marginLeft: '40px' }}>{ getModelName(aircraft) }</Grid>
      <Grid item xs={3} style={{ background: 'blue', marginLeft: '25px' }}>{ aircraft.status } </Grid>
      <Grid item style={{background: 'red'}}>
        <IconButton 
          className={classes.editButton}
          onClick={() => props.handleEdit(aircraft)}
        >
          <Edit />
        </IconButton>
      </Grid>

    </Grid>
  )
}