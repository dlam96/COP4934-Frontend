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

export default function NewAircraft(props) {
  const classes = useStyles();
  const { aircraftModels } = props;
  const [aircraft, setAircraft] = useState({model_uuid: '', tail_code: ''});
  const aircraftInfo = ['Tail Code', 'Aicraft Type', 'Model id', 'Current Status'];

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item>

        <Grid container item md={6} direction='column' spacing={2} style={{paddingLeft: '50px'}}>
          {aircraftInfo.map(label => (
            <Grid item key={label}>
              {label}
            </Grid>
          ))}
        </Grid>

        <Grid container item md={6} direction='column' spacing={2}>
          <Grid item>
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
          <Grid item>
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
          <Grid item>
            {aircraft.model_uuid}
          </Grid>
          <Grid item>
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
      <Grid container item>
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