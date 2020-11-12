import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  TextField, 
  Select,
  IconButton,
} from "@material-ui/core";
import {
  Save,
  AddCircle,
  RemoveCircle,
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
  crewSelect: {
    margin: theme.spacing(1),
  },
}));

export default function NewModel(props) {
  const classes = useStyles();
  const { crewPositions } = props;
  const [model, setModel] = useState({model_name: '', positions: [{ crew_position_uuid: '' }]});
  const aircraftInfo = ['Model Name', 'Crew'];

  const [inputSelects, setInputSelects] = useState([
    { crew_position_uuid: '' },
  ]);

  const handleChangeInput = (event, index) => {
    const crewList = [...inputSelects];
    crewList[index]['crew_position_uuid'] = event.target.value;
    setInputSelects(crewList);
    let newModel = {...model};
    newModel['positions'] = inputSelects;
    setModel(newModel);
  }

  const handleAddFields = () => {
    setInputSelects([...inputSelects, { crew_position_uuid: '' }])
  }

  const handleRemoveFields = (index) => {
    const values = [...inputSelects];
    values.splice(index, 1);
    setInputSelects(values);
  }

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
                  let newModel = {...model};
                  newModel['model_name'] = e.target.value
                  setModel(newModel)
                }
              }
            />
          </Grid>

          { inputSelects.map((inputSelect, index) => (
            <Grid container key={index} className={classes.crewSelect}>
              <Grid item md={8}>
                <Select
                  native
                  name='crew_position_uuid'
                  label='Crew Position'
                  value={inputSelect.crew_position_uuid}
                  onChange={(event) => handleChangeInput(event, index)}
                >
                  <option value=''>Select</option>
                  {crewPositions.map((pos, index) => (
                    <option value={pos.crew_position_uuid} key={index}>{pos.position}</option>
                  ))}
                </Select>
              </Grid>
              <Grid item md={2}>
                <IconButton
                  onClick={()=>handleRemoveFields(index)}
                >
                  <RemoveCircle />
                </IconButton>
              </Grid>
              <Grid item md={2}>
                <IconButton
                  onClick={()=>handleAddFields()}
                >
                  <AddCircle />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          
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
            // onClick={()=>props.handleNewModel(model)}
            onClick={()=>props.handleNewModel(model)}
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