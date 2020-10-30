import React, { useState } from "react";
import { 
  Paper, 
  makeStyles,
  Grid,
  Button,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  details: {
    margin: theme.spacing(2),
    marginBottom: '0px',
  },
}));

export default function ActiveAircrafts(props) {
  const classes = useStyles();
  const { aircraft, aircraftModels } = props;

  const aircraftIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 8);
    return res;
  }

  const getModelName = ( aircraft = null ) => {
    let index = aircraftModels.findIndex((element) => element.model_uuid === aircraft.model_uuid)
    return aircraftModels[index].model_name;
  }

  return( 
    <Grid container item className={classes.details}>
      <Grid item xs={2}> { aircraftIdSlice(aircraft.aircraft_uuid) } </Grid>
      <Grid item xs={3}> { getModelName(aircraft) }</Grid>
      <Grid item xs={2} > { aircraft.status } </Grid>
      <Grid item xs={5} align='right' style={{paddingRight: '30px', paddingBottom: '10px'}}>
        <Button 
          variant="contained"
          size="small" 
          onClick={() => props.handleEdit(aircraft)}
          align="right"
        >
          Edit
        </Button>
      </Grid>
      <Grid item xs={12} md={12}><Divider variant='middle' /></Grid>
    </Grid>
  )
}