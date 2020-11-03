import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  TextField, 
  Select,
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

export default function NewModel(props) {
  const classes = useStyles();
  const { crewPositions } = props;
  const [newModel, setNewModel] = useState(null);
  const aircraftInfo = ['Model Name', 'Crew'];

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
              onChange={(e) => setNewModel(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Select
              native
              onChange={(e) =>
                {
                  // let newAircraft = {...aircraft};
                  // newAircraft['status'] = e.target.value;
                  // setAircraft(newAircraft)
                }
              }
            >
              <option value=''>Select</option>
            {crewPositions.map((pos, index) => (
              <option value={pos.crew_position_uuid} key={index}>{pos.position}</option>
            ))}
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
            onClick={()=>props.handleNewModel(newModel)}
          >
            Save
          </Button>
          <Button
            variant="contained"
            onClick={()=>props.handleNewModel()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}