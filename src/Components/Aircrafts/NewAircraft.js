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

const useStyles = makeStyles((theme) => ({
  enterInfo: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    padding: '5%',
    width: '700px',
    height: '300px',
    marginTop: '50px',
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
  },
}));

export default function NewAircraft(props) {
  const classes = useStyles();
  const { aircraftModels } = props;
  const [aircraft, setAircraft] = useState({model_uuid: '', tail_code: ''});

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item direction='column'>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={4} align='end' style={{ marginRight: '100px' }} >
            <Typography>
              Tail Code
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField 
              onChange={(e) => 
                {
                  let newAircraft = {...aircraft};
                  newAircraft['tail_code'] = e.target.value;
                  setAircraft(newAircraft);
                }  
              }
            />
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={4} align='end' style={{ marginRight: '100px' }}>
            <Typography>
              Aircraft Model
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select 
              native
              value={aircraft.model_uuid}
              onChange={(e) =>
                {
                  let newAircraft = {...aircraft};
                  newAircraft['model_uuid'] = e.target.value;
                  setAircraft(newAircraft);
                }
              }
            >
              <option value=''>Select</option>
              {aircraftModels.map((model, index) => (
                <option value={model.model_uuid} key={index}>{model.model_name}</option>
              ))}
            </Select>
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={4} align='end' style={{ marginRight: '100px' }}>
            <Typography>
              Model ID
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography>
              { aircraft.model_uuid }
            </Typography>
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={4} align='end' style={{ marginRight: '100px' }}>
            <Typography>
              Current Status
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
              <option value="">Select</option>
              <option value="Unavailable">Unavailable</option>
              <option value="Available">Available</option>
              <option value="Maintenance">Maintenance</option>
            </Select>
          </Grid>
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
            onClick={()=>props.handleNewCraft(aircraft)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={()=>props.handleNewCraft()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}