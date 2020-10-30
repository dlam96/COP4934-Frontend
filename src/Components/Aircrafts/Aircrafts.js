import React, { useEffect, useState } from "react";
import axios from 'axios';
import { 
  Container,
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

import { connect } from 'react-redux';  
import { setAircraftModels, setAircrafts, setCrewPostions } from '../../Redux/actions.js'

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    width: '100%',
    height: 800,
  },
  aircraftList: {
    padding: theme.spacing(1),
    paddingLeft: '10px',
    paddingTop: '20px',
    background: '#96a1a7'
  },
  newModelPaper: {
    background: '#F1F1F1',
    height: '175px',
    width: '100%',
    opacity: '90%',
  },
  newAircraftBt: {
    background: '#F1F1F1',
    height: '50px',
    width: '100%',
    opacity: '80%',
  },
  addBt: {
    marginTop: '20px',
  },
}));

const testAircrafts = [
  { aircraft: "Pave Hawk", numCrew: 4, crew: ['pilot1', 'pilot2', 'flightEng', 'gunner'], craftId: "PH-001", aStatus: "Unavailable"},
  { aircraft: "Combat King", numCrew: 5, crew: ['pilot1', 'pilot2', 'cmbtSysOfficer', 'loadmaster1', 'loadmaster2'], craftId: "CK-001", aStatus: "Maintenance"},
  { aircraft: "Thunderbolt", numCrew: 1, crew: ['pilot1'], craftId: "T-001", aStatus: "Available"},  
]

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
  const [crafts, setCrafts] = useState(testAircrafts);
  const [edit, setEdit] = useState(false);
  const [editAircraft, setEditAircraft] = useState(null);
  const [editAircraftModel, setEditAircraftModel] = useState(null);
  const [editCrew, setEditCrew] = useState(null);

  const [addNew, setAddNew] = useState(false);
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
      if (!aircraft) {
        return;
      } else {
        console.log('Aircraft Update:', aircraft);
        // TODO: axios
      }
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
      let newAircrafts = [...crafts, aircraft];
      setCrafts(newAircrafts);
    }
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container item xs={9} md={9} lg={9} spacing={3}>

        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
              <Tab label="Aircrafts" />
              <Tab label="Models" />
              <Tab label="Crew" />
          </Tabs> 
        </AppBar>

        <Paper className={classes.paper} variant="outlined">

          {/* Active Aircrafts */}
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
                  <NewAircraft 
                    aircrafts={crafts}
                    handleNewCraft={handleNewCraft}
                  />
                </Grid>
                :     
                <Grid container spacing={2}>
                  {/* Active Aircraft List*/}
                  <Paper className={classes.aircraftList}>
                    <Grid container item xs={12} md={12} style={{marginBottom: '10px', paddingLeft: '10px'}}>
                      <Grid item xs={2} >Aircraft ID</Grid>
                      <Grid item xs={3} >Aircraft Model</Grid>
                      <Grid item xs={2} >Status</Grid>
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
                  </Paper>

                
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
                </Grid>
              }
            </TabPanel>  
          }
          
          {/* Aircraft Models */}
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
              <Grid container spacing={2} >
                {props.aircraftModels.map(model => (
                  <AircraftModels
                    aircraft={model}
                    handleModelEdit={handleModelEdit}
                    key={model.model_uuid}
                  />
                ))}  
                {/* New Model button */}
                <Grid item xs={3} sm={6}>
                  <Paper className={classes.newModelPaper}>
                    <Button 
                        startIcon={<Add />}
                        fullWidth={true}
                        size="large"
                        style={{
                          color: green[500],
                          minHeight: '100%',
                        }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>  
          } 

          {/* Aircraft Crew */}
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
                      style={{
                        color: green[500],
                        minHeight: '100%',
                      }}
                    />
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>  
          }

        </Paper>

      </Grid>
    </Container>
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