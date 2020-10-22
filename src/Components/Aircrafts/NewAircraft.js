import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
  FormHelperText,
  Typography,
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
    marginTop: theme.spacing(2),
  },
}));

export default function NewAircraft(props) {
  const classes = useStyles();
  const [aircraft, setAircraft] = useState({aStatus: ''});

  const aircraftInfo = [
    { label: "Aircraft Type", value: "aircraft" },
    { label: "Crew Size", value : "numCrew" },
    { label: "Inventory ID", value: "craftId"},
    { label: "Current Status", value: "aStatus"},
  ];

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      {aircraftInfo.map(info => 
      <Grid container className={classes.fields} key={info.value}>
        <Grid item xs={1} md={1} lg={1}/>
        <Grid item xs={5} md={5} lg={5}>
          {info.label}
        </Grid>
        <Grid item xs={5} md={5} lg={5}>
          { info.value === 'aStatus' ? 
            <FormControl size='small'>
              <Select
                native
                value={aircraft[info.value]}
                variant='outlined'
                onChange={e =>
                  {
                    let newAircraft = {...aircraft};
                    newAircraft[info.value] = e.target.value;
                    setAircraft(newAircraft);
                  }
                }
              >
                <option value="" disabled>Status</option>
                <option value="Unavailable">Unavailable</option>
                <option value="Available">Available</option>
                <option value="Maitenance">Maitenance</option>
              </Select>
            </FormControl>
            :
            <TextField
              variant='outlined'
              size='small'
              onChange={e =>
                {
                  let newAircraft = {...aircraft};
                  newAircraft[info.value] = e.target.value;
                  setAircraft(newAircraft);
                }
              }
            />
          }
        </Grid>
        <Grid item xs={1} md={1} lg={1}/>
      </Grid>
      )}
      <Grid container className={classes.buttons}>
        <Grid item md={6} align='end'>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={()=>props.handleNewCraft(aircraft)}
          >
            Save
          </Button>
        </Grid>
        <Grid item md={6} align='start'>
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