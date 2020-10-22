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
} from "@material-ui/core";
import {
  Save,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  fixedInfo: {
    height: 500,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    paddingTop: "50px",
    padding: theme.spacing(2),
  },
  positions: {
    paddingLeft: '30%',
    margin: '5px',
  },
  buttons: {
    paddingTop: theme.spacing(4),
  },
  saveBt: {
    marginRight: "10px",
  },
  editForm: {
    marginBottom: theme.spacing(1),
    width: "60%",
  },
}));

export default function EditAircraftModel(props) {
  const classes = useStyles();
  const fields = [
    { label: "Model Name", value: "aircraft" },
    { label: "Crew Size", value: "numCrew" },
  ];
  const [aircraft, setAircraft] = useState(props.aircraft);
  const [crewSize, setCrewSize] = useState(0);
  const [index, setIndex] = useState(0);

  const findIndex = (pos = null) => {
    
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Paper className={classes.fixedInfo} variant="outlined">

        {fields.map((item, index) => 
          <Grid container item>
            <Grid item xs={3} />
            <Grid item xs={3} align="start">
              <h3>{item.label}</h3>
            </Grid>
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
          </Grid>
        )}
        
        {/* Specific Positions */}
        <Grid container item direction='column'>
          {aircraft.crew.map( pos =>
            <Grid item xs={12} md={12} lg={12} className={classes.positions} key={pos}>
              <TextField 
                variant='outlined' 
                size='small'
                value={pos}
                onChange={(e) =>
                  {
                    let newAircraft = {...aircraft};
                    newAircraft.crew[pos] = e.target.value;
                    setAircraft(newAircraft);
                  }
                }
              />
            </Grid>
          )}
        </Grid>

        {/* Save and Cancel buttons */}
        <Grid container item>
          <Grid item xs={12} align="center" className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              className={classes.saveBt}
              onClick={()=>props.handleModelEdit(aircraft)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={()=>props.handleModelEdit()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

      </Paper>
    </Container>
  )

}