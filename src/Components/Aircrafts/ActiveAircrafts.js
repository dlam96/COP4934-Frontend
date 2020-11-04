import React from "react";
import { 
  makeStyles,
  Grid,
  Divider,
  IconButton
} from "@material-ui/core";
import {
  Edit,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  details: {
    paddingLeft: '10px',
    marginBottom: '5px',
    alignItems: 'center',
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
    <Grid container item className={classes.details}>
      <Grid item xs={2}> { aircraft.tail_code } </Grid>
      <Grid item xs={4}> { getModelName(aircraft) }</Grid>
      <Grid item xs={2} > { aircraft.status } </Grid>
      <Grid item xs={4} align='right' style={{paddingRight: '30px'}}>
        <IconButton 
          color='primary'
          onClick={() => props.handleEdit(aircraft)}
          align="right"
        >
          <Edit />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={12}><Divider variant='middle' /></Grid>
    </Grid>
  )
}