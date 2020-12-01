import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  IconButton,
  Select,
  FormControl,
  TextField,
  Typography,
} from "@material-ui/core";
import {
  Save,
  Delete,
} from "@material-ui/icons";
import ConfirmDelete from './ConfirmDelete.js';
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

export default function EditAircraft(props) {
  const classes = useStyles();
  const { aircraftModels } = props;
  const [aircraft, setAircraft] = useState(props.aircraft);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getModelName = ( aircraft = null ) => {
    let index = aircraftModels.findIndex((element) => element.model_uuid === aircraft.model_uuid);
    if (index < 0) return;
    return aircraftModels[index].model_name;
  }

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item direction='column' style={{ justifyContent: 'center' }}>
        <Grid container item className={classes.labelBar}>
          <Typography variant='h5'>
            Edit Aircraft
          </Typography>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
            <Typography>
              Aircraft ID
            </Typography>
          </Grid>
          <Grid item xs={5}>
            { aircraft.aircraft_uuid }
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Tail Code
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              id='tail-code-edit'
              size='small'
              variant='outlined'
              value={aircraft.tail_code}
              onChange={(e) => 
                {
                  let newAircraft = {...aircraft};
                  newAircraft['tail_code'] = e.target.value;
                  setAircraft(newAircraft)
                }
              }
            />
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Aircraft Model
            </Typography>
          </Grid>
          <Grid item xs={4}>
            { getModelName(aircraft) }
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Status
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              native
              value={aircraft.status}
              onChange={(e) =>
                {
                  let newAircraft = {...aircraft};
                  newAircraft['status'] = e.target.value;
                  setAircraft(newAircraft)
                }
              }
            >
              <option value="Unavailable">Unavailable</option>
              <option value="Available">Available</option>
              <option value="Maitenance">Maitenance</option>
            </Select>
          </Grid>
        </Grid>
      </Grid>
      
      {/* Save and Cancel buttons */}
      <Grid container item style={{ marginTop: '10px' }}>
        <Grid item xs={2} align='start'>
          <IconButton
            color='secondary'
            // onClick={()=>props.handleDeleteAircraft(aircraft)}
            onClick={()=> setConfirmDelete(true)}
          >
            <Delete />
          </IconButton>
          <ConfirmDelete
            title='Delete Aircraft?'
            open={confirmDelete}
            setOpen={setConfirmDelete}
            aircraft={aircraft}
            handleDeleteAircraft={props.handleDeleteAircraft}
            handleEdit={props.handleEdit}
          >
            Are you sure you want to delete this aircraft?
          </ConfirmDelete>
        </Grid>
        <Grid item xs={2} />
        <Grid item xs={4} className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            className={classes.saveBt}
            onClick={()=>props.handleEdit(aircraft)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={()=>props.handleEdit()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}