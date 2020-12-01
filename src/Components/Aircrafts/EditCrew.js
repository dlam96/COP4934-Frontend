import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  FormControl,
  Select,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  Save,
  Delete,
} from "@material-ui/icons";
import ConfirmDeleteCrew from './ConfirmDeleteCrew';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  enterInfo: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    padding: '15px',
    width: '700px',
    height: '250px',
    marginTop: '50px',
  },
  fields: {
    margin: '5px',
  },
  buttons: {
    paddingTop: '10px',
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

export default function EditCrew(props) {
  const classes = useStyles();
  const [position, setPosition] = useState(props.position);
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item direction='column' style={{ justifyContent: 'center' }}>
        <Grid container item className={classes.labelBar}>
          <Typography variant='h5'>
            Crew Position Detail
          </Typography>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
            <Typography>
              Position
            </Typography>
          </Grid>
          <Grid item xs={5}>
            { position.position }
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Required
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
                native
                value={position.required}
                onChange={(e) =>
                  {
                    let newPosition = {...position};
                    newPosition['required'] = e.target.value;
                    setPosition(newPosition)
                  }
                }
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Select>
          </Grid>
        </Grid>
      </Grid>

      {/* Save and Cancel buttons */}
      <Grid container item style={{ marginTop: '10px' }}>
        <Grid item xs={2} align='start'>
          <IconButton
            color='secondary'
            onClick={()=> setConfirmDelete(true)}
          >
            <Delete />
          </IconButton>
          <ConfirmDeleteCrew
              title='Delete Crew?'
              open={confirmDelete}
              setOpen={setConfirmDelete}
              position={position}
              handleDeleteCrew={props.handleDeleteCrew}
              handleCrewEdit={props.handleCrewEdit}
          >
            Are you sure you want to delete this crew?
          </ConfirmDeleteCrew>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4} className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            className={classes.saveBt}
            onClick={()=>{ props.handleCrewEdit(position) }}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={()=>props.handleCrewEdit()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}
