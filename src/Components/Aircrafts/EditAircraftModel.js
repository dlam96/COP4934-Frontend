import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  IconButton,
} from "@material-ui/core";
import {
  Delete,
} from "@material-ui/icons";
import ConfirmDeleteModel from './ConfirmDeleteModel';

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
  const { crewPositions, model } = props;
  const [confirmDelete, setConfirmDelete] = useState(false);

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
          <Grid item xs={4} align='start'>{ model.model_uuid }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Model Name</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ model.model_name }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Positions:</Grid>
          {model.positions.map(pos => (
            <Grid item xs={12} align='center' key={pos.crew_position_uuid}>
              {getPositionName(pos)}
            </Grid>
          ))}
        </Grid>

        {/* Save and Cancel buttons */}
        <Grid container item className={classes.buttons}>
          <Grid item xs={4} align="center">
            <IconButton
              color='secondary'
              onClick={()=>setConfirmDelete(true)}
            >
              <Delete />
            </IconButton>
            <ConfirmDeleteModel
              title='Delete Model?'
              open={confirmDelete}
              setOpen={setConfirmDelete}
              model={model}
              handleDeleteModel={props.handleDeleteModel}
              handleModelEdit={props.handleModelEdit}
            >
              Are you sure you want to delete this model?
            </ConfirmDeleteModel>
          </Grid>
          <Grid item md={8} align="center">
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