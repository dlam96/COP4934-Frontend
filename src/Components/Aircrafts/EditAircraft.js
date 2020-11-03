import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  IconButton,
  Select,
  FormControl,
} from "@material-ui/core";
import {
  Save,
  Delete,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  fixedInfo: {
    height: '300px',
    width: '500px',
    paddingTop: "50px",
    padding: theme.spacing(2),
    marginLeft: '100px',
  },
  crewPos: {
    width: '100%',
  },
  buttons: {
    paddingLeft: '20%',
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
  const { aircraftModels } = props;
  const [aircraft, setAircraft] = useState(props.aircraft);

  const getModelName = ( aircraft = null ) => {
    let index = aircraftModels.findIndex((element) => element.model_uuid === aircraft.model_uuid)
    return aircraftModels[index].model_name;
  }

  return (
    <Paper className={classes.fixedInfo} variant="outlined">
      <Grid container item direction='column' spacing={2}>

        {/* Aircraft Info */}
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Aircraft ID</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ aircraft.aircraft_uuid }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Aircraft Model</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ getModelName(aircraft) }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Status</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} alight='start'>
            <FormControl size='small'>
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
            </FormControl>
          </Grid>
        </Grid>

        {/* Save and Cancel buttons */}
        <Grid container item>
          <Grid item xs={2} align='start'>
            <IconButton
              color='secondary'
            >
              <Delete />
            </IconButton>
          </Grid>
          <Grid item xs={10} className={classes.buttons}>
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