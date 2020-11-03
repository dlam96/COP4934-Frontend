import React, { useEffect, useState } from "react";
import axios from 'axios';
import { 
  Grid, 
  Paper, 
  makeStyles, 
  AppBar, 
  Tabs, 
  Tab,
  Typography,
  Box,
  Button,
  Divider,
} from "@material-ui/core";
import {
  Add,
} from "@material-ui/icons";
import {
  green,
} from '@material-ui/core/colors';
import ActiveAircrafts from './ActiveAircrafts.js';
import AircraftModels from './AircraftModels.js';
import AircraftCrew from './AircraftCrew.js';
import EditAircraft from './EditAircraft.js';
import EditAircraftModel from './EditAircraftModel.js';
import EditCrew from './EditCrew.js';
import NewAircraft from './NewAircraft.js';
import NewModel from './NewModel.js';
import NewCrew from './NewCrew.js';

import { connect } from 'react-redux';  
import { setAircraftModels, setAircrafts, setCrewPostions } from '../../Redux/actions.js'

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    background: '#96a1a7',
    height: '1000px',
    width: '1200px',
    borderRadius: '10px',
  },
  aircraftList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '700px',
    background: '#878787',
  },
  modelList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '700px',
    background: '#878787',
    borderRadius: '5px',
    alignContent: 'flex-start',
  },
  newModelPaper: {
    margin: '5px',
    background: '#F1F1F1',
    height: '175px',
    width: '97%',
  },
  newAircraftBt: {
    background: '#F1F1F1',
    height: '50px',
    width: '100%',
    opacity: '40%',
    marginTop: '10px',
  },
  addBt: {
    marginTop: '20px',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(4),
    height: '125px',
  },
  appBar: {
    background: '#AAAAAA',
    opacity: '80%',
  },
  infoBoxes: {
    height: '825px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  quickInfo: {
    height: '300px',
    width: '200px',
    background: '#878787',
    margin: '10px',
    borderRadius: '5px',
  },
  search: {
    height: '400px',
    width: '200px',
    background: '#878787',
    margin: '10px',
    borderRadius: '5px',
  },
  mainInfo: {
    height: '825px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component={'span'} variant={'body2'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function Aircrafts(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [editAircraft, setEditAircraft] = useState(null);
  const [editAircraftModel, setEditAircraftModel] = useState(null);
  const [editCrew, setEditCrew] = useState(null);

  // const [editAllCrafts, setEditAllCrafts] = useState(null);

  useEffect(() => {
    axios.get('/approval')
      .then((response) => {
        console.log("Aircrafts:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }, [])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = (aircraft = null) => {
    if (!edit) {
      setEditAircraft(aircraft);
      setEdit(true);
    } else {
      setEdit(false);
      if (!aircraft) return;
      console.log('Aircraft Update:', aircraft);
      // TODO: axios
    }
  }

  const handleModelEdit = (aircraft = null) => {
    if (!edit) {
      setEditAircraftModel(aircraft);
      setEdit(true);
    } else {
      setEdit(false);
      if (!aircraft) return;
    }
  }

  const handleCrewEdit = (position = null) => {
    if (!edit) {
      setEditCrew(position);
      setEdit(true);
    } else {
      setEdit(false);
      if (!position) return;
    }
  }

  const handleNewCraft = (aircraft = null) => {
    if (!addNew) {
      setAddNew(true);
    } else {
      setAddNew(false);
      if (!aircraft) return;
      axios
        .post(
          "/aircraft",
          {
            model_uuid: aircraft.model_uuid,
            status: aircraft.status,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("Response from Post:", response);
        })
        .catch((error) => {
          console.log("Error:", error);
        })
    }
  }

  const handleNewModel = (model = null) => {
    if (!addNew) {
      setAddNew(true);
    } else {
      setAddNew(false);
      if (!model) return;
    }
  }

  const handleNewCrew = (crew = null) => {
    if (!addNew) {
      setAddNew(true);
    } else {
      setAddNew(false);
      if (!crew) return;
    }
  }

  return (
    <Grid container className={classes.container} direction='column'>

      <Grid item className={classes.title}>
        <Typography variant='h2'>
          Aircrafts
        </Typography>
      </Grid>

      <Grid item style={{height: '45px'}}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value} indicatorColor="primary" onChange={handleChange}>
            <Tab label="Aircrafts" />
            <Tab label="Models" />
            <Tab label="Crew" />
          </Tabs> 
        </AppBar>
      </Grid>

      <Grid container item direction='row'>

        <Grid container item md={3} direction='column' className={classes.infoBoxes}>
          <Grid container item className={classes.quickInfo}>

          </Grid>
          <Grid container item className={classes.search}>

          </Grid>
        </Grid>

        <Grid container item md={9} direction='column' className={classes.mainInfo}>
          {/* Tab 1 Active Aircrafts */}
          {edit ?
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <EditAircraft
                  aircraft={editAircraft}
                  aircraftModels={props.aircraftModels}
                  handleEdit={handleEdit}
                />
              </Grid>
            </TabPanel>
            :
            <TabPanel value={value} index={0}>
              {addNew ?
                <Grid container spacing={2}>
                  {/* Add New Aircraft to database */}
                  <NewAircraft 
                    aircraftModels={props.aircraftModels}
                    handleNewCraft={handleNewCraft}
                  />
                </Grid>
                :     
                <Grid container spacing={2}>
                  {/* Active Aircraft List*/}
                  <Paper className={classes.aircraftList}>
                    <Grid container item xs={12} md={12} style={{marginBottom: '10px', paddingLeft: '10px'}}>
                      <Grid item xs={2}>
                        <Typography variant='h6'>
                          Aircraft ID
                        </Typography>
                      </Grid>
                      <Grid item xs={4}>
                        <Typography variant='h6'>
                          Aircraft Model
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant='h6'>
                          Status
                        </Typography>
                      </Grid>
                    </Grid>
                    <Divider variant='fullWidth'/>
                    <Grid container item xs={12} md={12}>
                      {props.aircrafts.map(aircraft => (
                        <ActiveAircrafts
                          aircraft={aircraft}
                          aircraftModels={props.aircraftModels}
                          handleEdit={handleEdit}
                          key={aircraft.aircraft_uuid}
                        />
                      ))}
                    </Grid>
                    {/* New Aircraft button */}
                    <Grid container item xs={12} md={12}>
                      <Paper className={classes.newAircraftBt}>
                        <Button 
                          startIcon={<Add />}
                          fullWidth={true}
                          size="large"
                          onClick={()=>handleNewCraft()}
                          style={{
                            color: green[500],
                            minHeight: '100%',
                          }}
                        />
                      </Paper>
                    </Grid>
                  </Paper>

                </Grid>
              }
            </TabPanel>  
          }
          
          {/* Tab 2 Aircraft Models */}
          {edit ?
            <TabPanel value={value} index={1}>
              <Grid container spacing={2}>
                <EditAircraftModel
                  aircraft={editAircraftModel}
                  crewPositions={props.crewPositions}
                  handleModelEdit={handleModelEdit}
                />
              </Grid>
            </TabPanel>
            :
            <TabPanel value={value} index={1}>
              {addNew ?
                <Grid container spacing={2}>
                  {/* Add New Model to database */}
                  <NewModel 
                    aircraftModels={props.aircraftModels}
                    crewPositions={props.crewPositions}
                    handleNewModel={handleNewModel}
                  />
                </Grid>
                :
                <Grid container className={classes.modelList}>
                  {props.aircraftModels.map(model => (
                    <Grid item md={6} style={{height: '185px'}}>
                      <AircraftModels
                        aircraft={model}
                        handleModelEdit={handleModelEdit}
                        key={model.model_uuid}
                      />
                    </Grid>
                  ))}  
                  {/* New Model button */}
                  <Grid item md={6} style={{height: '185px'}}>
                    <Paper className={classes.newModelPaper}>
                      <Button 
                          startIcon={<Add />}
                          fullWidth={true}
                          size="large"
                          onClick={()=>handleNewModel()}
                          style={{
                            color: green[500],
                            minHeight: '100%',
                          }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              }
            </TabPanel>  
          } 

          {/* Tab 3 Aircraft Crew */}
          {edit ?
            <TabPanel value={value} index={2}>
              <Grid container spacing={2}>
                <EditCrew
                  position={editCrew}
                  handleCrewEdit={handleCrewEdit}
                />
              </Grid>
            </TabPanel>
            :
            <TabPanel value={value} index={2}>
              {addNew ?
                <Grid container spacing={2}>
                  {/* Add New Crew Position to database */}
                  <NewCrew
                    handleNewCrew={handleNewCrew}
                  />
                </Grid>
                :
                <Grid container spacing={2} >
                  {props.crewPositions.map(pos => (
                    <AircraftCrew
                      position={pos}
                      handleCrewEdit={handleCrewEdit}
                      key={pos.crew_position_uuid}
                    />
                  ))}  
                  {/* New Position button */}
                  <Grid item xs={3} sm={6}>
                    <Paper className={classes.newModelPaper}>
                      <Button 
                        startIcon={<Add />}
                        fullWidth={true}
                        size="large"
                        onClick={()=>handleNewCrew()}
                        style={{
                          color: green[500],
                          minHeight: '100%',
                        }}
                      />
                    </Paper>
                  </Grid>
                </Grid>
              }
            </TabPanel>  
          }
        </Grid>

      </Grid>
      
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    aircrafts: state.aircraftReducer,
    aircraftModels: state.aircraftmodelReducer, 
    crewPositions: state.crewpositionReducer,
  }
}

const mapDispatchToProps = {
  aircraftAction: setAircrafts,
  aircraftModelAction: setAircraftModels,
  crewPositionAction: setCrewPostions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Aircrafts)