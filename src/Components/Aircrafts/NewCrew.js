import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Select,
  Button,
  TextField, 
  Typography,
} from "@material-ui/core";
import {
  Save,
} from "@material-ui/icons";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  enterInfo: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    padding: '15px',
    width: '700px',
    height: '300px',
    marginTop: '30px',
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

export default function NewCrew(props) {
  const classes = useStyles();
  const [newCrew, setNewCrew] = useState(false);

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item direction='column' style={{ justifyContent: 'center' }}>
        <Grid container item className={classes.labelBar}>
          <Typography variant='h5'>
            Add New Crew
          </Typography>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
            <Typography>
              Position Name
            </Typography>
          </Grid>
          <Grid item xs={4}>
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
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
            <Typography>
              Required
            </Typography>
          </Grid>
          <Grid item xs={4}>
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
        
        {/* Save and Cancel buttons */}
        <Grid item>
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
      </Grid>  
    </Paper>
  )
}  