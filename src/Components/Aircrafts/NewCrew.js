import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Select,
  Button,
  TextField, 
} from "@material-ui/core";
import {
  Save,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  enterInfo: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    padding: '5%',
    width: '100%',
    height: '100%',
  },
  fields: {
    margin: '5px',
  },
  buttons: {
    paddingTop: theme.spacing(4),
  },
  saveBt: {
    marginRight: "10px",
  },
}));

export default function NewCrew(props) {
  const classes = useStyles();
  const [newCrew, setNewCrew] = useState(false);
  const aircraftInfo = ['Position Name', 'Required'];

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item>
        <Grid container item md={6} direction='column' spacing={2} style={{paddingLeft: '100px'}}>
          {aircraftInfo.map(label => (
            <Grid item key={label}>
              {label}
            </Grid>
          ))}
        </Grid>
        <Grid container item md={6} direction='column' spacing={2}>
          <Grid item>
            <TextField 
              variant='outlined' 
              size='small'
              onChange={(e) => 
                {
                  let newCrewPos = {...newCrew};
                  newCrewPos['position'] = e.target.value;
                  setNewCrew(newCrewPos);
                }
              }
            />
          </Grid>
          <Grid item>
            <Select
              native
              value={newCrew.required}
              onChange={(e) => 
                {
                  let newCrewPos = {...newCrew};
                  newCrewPos['required'] = e.target.value;
                  setNewCrew(newCrewPos);
                }
              }
            >
              <option value=''>Select</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Select>
          </Grid>
        </Grid>
      </Grid>
      {/* Save and Cancel buttons */}
      <Grid container item>
        <Grid item xs={12} align="center" className={classes.buttons}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            className={classes.saveBt}
            onClick={()=>props.handleNewCrew(newCrew)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={()=>props.handleNewCrew()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}