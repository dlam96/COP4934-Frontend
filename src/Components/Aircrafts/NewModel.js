import React, { useState } from 'react';
import {
  Grid,
  Paper,
  makeStyles,
  Button,
  TextField, 
  Select,
  IconButton,
  Typography,
} from "@material-ui/core";
import {
  Save,
  AddCircle,
  RemoveCircle,
} from "@material-ui/icons";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  enterInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    width: '700px',
    height: '500px',
    marginTop: '50px',
  },
  labelBar: {
    backgroundColor: fade(theme.palette.primary.main, 0.75),
    height: '50px',
    padding: '1px',
    marginBottom: '30px', 
    borderRadius: '5px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fields: {
    margin: '5px',
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
    if (inputSelects.length === 1) return;
    const values = [...inputSelects];
    values.splice(index, 1);
    setInputSelects(values);
  }

  return (
    <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item direction='column' style={{ justifyContent: 'center' }}>
        <Grid container item className={classes.labelBar}>
          <Typography variant='h5'>
            Add New Model
          </Typography>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
            <Typography>
              Model Name
            </Typography>
          </Grid>
          <Grid item xs={4}>
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
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Crew Positions
            </Typography>
          </Grid>
          <Grid item xs={6} style={{ height: '300px', overflowY: 'auto', overflowX: 'hidden' }}>
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