import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  Delete,
} from "@material-ui/icons";
import ConfirmDeleteModel from './ConfirmDeleteModel';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  enterInfo: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    padding: '15px',
    width: '700px',
    height: '350px',
    marginTop: '50px',
  },
  fields: {
    margin: '5px',
  },
  buttons: {
    paddingTop: '40px',
  },
  saveBt: {
    marginRight: "10px",
  },
  inputRow: {
    alignItems: 'center',
    marginTop: '15px',
  },
  labelBar: {
    backgroundColor: fade(theme.palette.primary.main, 0.75),
    height: '50px',
    padding: '1px',
    marginBottom: '15px', 
    borderRadius: '5px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
    <Paper className={classes.enterInfo} variant='outlined'>
    <Grid container item direction='column' style={{ justifyContent: 'center' }}>
      <Grid container item className={classes.labelBar}>
        <Typography variant='h5'>
          Model Details
        </Typography>
      </Grid>
      <Grid container item direction='row' className={classes.inputRow}>
        <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
          <Typography>
            Model Name
          </Typography>
        </Grid>
        <Grid item xs={5}>
          { model.model_name }
        </Grid>
      </Grid>
      <Grid container item direction='row' className={classes.inputRow}>
        <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
          <Typography>
            Positions
          </Typography>
        </Grid>
        <Grid item xs={4}>
          {model.positions.map(pos => (
            <Grid item xs={12} align='start' key={pos.crew_position_uuid}>
              {getPositionName(pos)}
            </Grid>
          ))}
        </Grid>
      </Grid>
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
        <Grid item md={4} align="center">
          <Button
            variant="contained"
            onClick={()=>props.handleModelEdit()}
          >
            Back
          </Button>
        </Grid>
      </Grid>
      
  </Paper>
  )
}