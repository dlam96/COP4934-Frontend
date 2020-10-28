import React, { useState } from 'react';
import {
  Container,
  Grid,
  Paper,
  makeStyles,
  TextField,
  Button,
  FormControl,
  Select,
} from "@material-ui/core";
import {
  Save,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  fixedInfo: {
    height: '100%',
    width: '100%',
    paddingTop: "50px",
    padding: theme.spacing(2),
  },
  buttons: {
    paddingTop: theme.spacing(4),
  },
  saveBt: {
    marginRight: "10px",
  },
}));

export default function EditCrew(props) {
  const classes = useStyles();
  const [position, setPosition] = useState(props.position);

  return (
    <Paper className={classes.fixedInfo} variant="outlined">
      <Grid container item direct='column' spacing={2}>
        
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Position</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ position.position }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Position id</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} align='start'>{ position.crew_position_uuid }</Grid>
        </Grid>
        <Grid container item direction='row'>
          <Grid item xs={4} align='right'>Required</Grid>
          <Grid item xs={1} />
          <Grid item xs={4} alight='start'>
            <FormControl size='small'>
              <Select
                native
                value={position.required}
                onChange={(e) =>
                  {
                    let newPosition = {...position};
                    newPosition['required'] = e.target.value;
                    setPosition(newPosition)
                  }
                }
              >
                <option value="True">Yes</option>
                <option value="False">No</option>
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item xs={12} align="center" className={classes.buttons}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<Save />}
              className={classes.saveBt}
              onClick={()=>props.handleCrewEdit(position)}
            >
              Save
            </Button>
            <Button
              variant="contained"
              onClick={()=>props.handleCrewEdit()}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>

      </Grid>
    </Paper>
  )
}