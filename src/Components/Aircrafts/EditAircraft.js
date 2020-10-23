import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  TextField,
  Button,
  Select,
  FormControl,
  Typography,
} from "@material-ui/core";
import {
  Save,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
    width: '100%',
  },
  fixedInfo: {
    height: '100%',
    width: '100%',
    paddingTop: "50px",
    padding: theme.spacing(2),
  },
  crewPos: {
    width: '100%',
  },
  buttons: {
    paddingTop: theme.spacing(4),
  },
  saveBt: {
    marginRight: "10px",
  },
  posInfo: {
    margin: theme.spacing(1),
    paddingLeft: '50%',
  },
}));

export default function EditAircraft(props) {
  const classes = useStyles();
  const fields = [
    {label: "Aircraft Type", value: "aircraft"},
    {label: "Inventory ID", value: "craftId"},
    {label: "Current Status", value: "aStatus"},
    {label: "Crew Size", value: "numCrew"},
  ];
  const crewPositions = [
    {label: "Pilot 1", value: "pilot1"},
    {label: "Pilot 2", value: "pilot2"},
    {label: "Flight Engineer", value: "flightEng"},
    {label: "Gunner", value: "gunner"},
    {label: "Combat Systems Officer", value: "cmbtSysOfficer"},
    {label: "Loadmaster 1", value: "loadmaster1"},
    {label: "Loadmaster 2", value: "loadmaster2"},
  ];

  const [aircraft, setAircraft] = useState(props.aircraft);

  return (
      <Paper className={classes.fixedInfo} variant="outlined">
        <Grid container>
          {fields.map((item) => 
            <Grid container item key={item.value}>
              <Grid item xs={3} />
              <Grid item xs={3} align="start">
                <h3>{item.label}</h3>
              </Grid>

              { !(item.label === "Current Status") ?
                <Grid item xs={6}>
                  <TextField
                    variant="outlined"
                    size="small"
                    value={aircraft[item.value]}
                    onChange={(e) =>
                      {
                        let newAircraft = {...aircraft};
                        newAircraft[item.value] = e.target.value;
                        setAircraft(newAircraft);
                      }
                    }
                  />
                </Grid>
                :
                <Grid item xs={6}>
                  <FormControl size='small' variant='outlined'>
                    <Select
                      native
                      value={aircraft[item.value]}
                      onChange={(e) =>
                        {
                          let newAircraft = {...aircraft};
                          newAircraft[item.value] = e.target.value;
                          setAircraft(newAircraft);
                        }
                      }
                    >
                      <option value="">{aircraft[item.value]}</option>
                      <option value="Unavailable">Unavailable</option>
                      <option value="Available">Available</option>
                      <option value="Maitenance">Maitenance</option>
                    </Select>
                  </FormControl>
                </Grid>
              }
            </Grid>
          )}

          {aircraft.crew.map(person => (
            <Grid container item key={person}>
              <Grid item xs={6} md={6}>
                {crewPositions.map(pos => (
                  <div className={classes.posInfo} key={pos.value}>
                    { (person === pos.value) ?
                      <Typography variant='body2'>
                        {pos.label}
                      </Typography>
                      :
                      null
                    }
                  </div>
                ))}
              </Grid>
              <Grid item xs={3} md={3} >
                <TextField
                  variant="outlined"
                  size="small"
                  margin="dense"
                  // value={aircraft[item.value]}
                  // onChange={(e) =>
                  //   {
                  //     let newAircraft = {...aircraft};
                  //     newAircraft[item.value] = e.target.value;
                  //     setAircraft(newAircraft);
                  //   }
                  // }
                />
              </Grid>
            </Grid>
          ))}

          {/* Save and Cancel buttons */}
          <Grid container item direction="row">
            <Grid item xs={12} align="center" className={classes.buttons}>
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
        </Grid>
      </Paper>
  )

}