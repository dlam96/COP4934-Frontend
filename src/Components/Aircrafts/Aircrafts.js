import React, { useState } from "react";
import { connect } from 'react-redux';
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
  Container,
} from "@material-ui/core";
import {
  Add,
} from "@material-ui/icons";
import {
  green,
} from '@material-ui/core/colors';

import { setAircraftModels, setAircrafts, setCrewPostions } from '../../Redux/actions.js';

import EditAircraftModel from './EditAircraftModel.js';
import ActiveAircrafts from './ActiveAircrafts.js';
import AircraftModels from './AircraftModels.js';
import AircraftCrew from './AircraftCrew.js';
import EditAircraft from './EditAircraft.js';
import NewAircraft from './NewAircraft.js';
import EditCrew from './EditCrew.js';
import NewModel from './NewModel.js';
import NewCrew from './NewCrew.js';
import TabControlAircraft from './TabControlAircraft.js';

const useStyles = makeStyles((theme) => ({
  container: {
    // padding: theme.spacing(2),
    minHeight: '92vh',
    maxHeight: '100%',
    height: '100%',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(4),
    height: '125px',
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
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
    margin: '10px',
    borderRadius: '5px',
  },
  search: {
    height: '400px',
    width: '200px',
    margin: '10px',
    borderRadius: '5px',
  },
  mainInfo: {
    height: '825px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '710px',
    maxHeight: '715px',
    overflowY: 'scroll',
  },
  labelBar: {
    backgroundColor: theme.palette.primary.main,
    marginBottom: '10px', 
    paddingLeft: '10px',
    borderRadius: '5px',
    color: 'white',
  },
  newAircraftBt: {
    background: '#F1F1F1',
    height: '50px',
    width: '100%',
    opacity: '40%',
    marginTop: '10px',
    opacity: '75%',
  },
  cardList: {
    justifyContent: 'flex-start',
  },
  newButtonPaper: {
    margin: '5px',
    background: '#F1F1F1',
    height: '175px',
    width: '97%',
    opacity: '75%',
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`admin-aircraft-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Grid container spacing={2}>
            {children}
          </Grid>
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
  const [aircraftList, setAircraftList] = useState(props.aircrafts);
  const [editAircraft, setEditAircraft] = useState(null);
  const [editAircraftModel, setEditAircraftModel] = useState(null);
  const [editCrew, setEditCrew] = useState(null);

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
      
      const updatedAircrafts = aircraftList.filter(
        (item) => item.aircraft_uuid !== aircraft.aircraft_uuid
      );

      const updatedAircraft = {...aircraft};
      updatedAircrafts.push(updatedAircraft)

      axios
        .patch("/aircraft/" + aircraft.aircraft_uuid,
        {
          status: aircraft.status,
        })
        .then((response) => {
          console.log("Response from Post:", response);
          setAircraftList(updatedAircrafts);
        })
        .catch((error) => {
          console.log("Error:", error);
        })
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
      axios
        .patch("/crew_position/" + position.crew_position_uuid,
        {
          required: position.required,
        })
        .then((response) => {
          console.log("Response from Post:", response);
        })
        .catch((error) => {
          console.log("Error:", error);
        })
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
            tail_code: aircraft.tail_code,
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
      // console.log('Testing model', model.model_name, model.positions)
      axios
        .post(
          "aircraft_model",
          {
            model_name: model.model_name,
            positions: model.positions,
          },
          { headers: { "Content-Type": "application/json" }}
        )
        .then((response) => {
          console.log("Response from Post Model:", response.data);
        })
        .catch((error) => {
          console.log("Error:", error)
        })
    } 
  }

  const handleNewCrew = (crew = null) => {
    if (!addNew) {
      setAddNew(true);
    } else {
      setAddNew(false);
      if (!crew) return;
      axios
        .post(
          "/crew_position",
          {
            position: crew.position,
            required: crew.required,
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
  
  const handleDeleteAircraft = (aircraft = null) => {
    if (!aircraft) return;
    axios
      .delete("/aircraft/" + aircraft.aircraft_uuid)
      .then((response) => {
        console.log("Response from delete Aircraft:", response);
        console.log("Delete Model:", aircraft)
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }

  const handleDeleteModel = (model = null) => {
    if (!model) return;
    axios
      .delete("/aircraft_model/" + model.model_uuid)
      .then((response) => {
        console.log("Response from delete Model:", response);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }

  const handleDeleteCrew = (crew = null) => {
    if (!crew) return;
    axios
      .delete("/crew_position/" + crew.crew_position_uuid)
      .then((response) => {
        console.log("Response from delete Crew:", response);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }

  return (
    <Container maxWidth='lg'>
      <Paper container className={classes.container} direction='column'>

        <Grid item className={classes.title}>
          <Typography variant='h2'>
            Aircrafts
          </Typography>
        </Grid>

        <Grid item style={{height: '45px'}}>
          <AppBar position="static" className={classes.appBar}>
            {(edit || addNew) ? 
              <TabControlAircraft
                handleChange={handleChange}
                value={value}
              />
              :
              <Tabs value={value} indicatorColor="primary" onChange={handleChange}>
                <Tab label="Aircrafts" />
                <Tab label="Models" />
                <Tab label="Crew" />
              </Tabs> 
            }
          </AppBar>
        </Grid>

        <Grid container item direction='row'>

          <Grid container item md={3} direction='column' className={classes.infoBoxes}>
            <Paper container item className={classes.quickInfo}>

            </Paper>
            <Paper container item className={classes.search}>

            </Paper>
          </Grid>

          <Grid container item md={9} direction='column' className={classes.mainInfo}>

            {/* Tab 1 Active Aircrafts */}
            {edit ? 
              <TabPanel value={value} index={0}>
                <EditAircraft
                  aircraft={editAircraft}
                  aircraftModels={props.aircraftModels}
                  handleDeleteAircraft={handleDeleteAircraft}
                  handleEdit={handleEdit}
                />
              </TabPanel>
              :
              <TabPanel value={value} index={0}>
                {addNew ?
                  <> {/* Add New Aircraft to database */}
                    <NewAircraft 
                      aircraftModels={props.aircraftModels}
                      handleNewCraft={handleNewCraft}
                    />
                  </>
                  :     
                  <> {/* Active Aircraft List*/}
                    <Paper className={classes.mainList}>
                      <Grid container item xs={12} md={12} className={classes.labelBar}>
                        <Grid item xs={2}>
                          <Typography variant='subtitle1'>Aircraft ID</Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography variant='subtitle1'>Aircraft Model</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant='subtitle1'>Status</Typography>
                        </Grid>
                      </Grid>
                      <Divider variant='fullWidth'/>
                      {aircraftList.map(aircraft => (
                        <ActiveAircrafts
                          aircraft={aircraft}
                          aircraftModels={props.aircraftModels}
                          handleEdit={handleEdit}
                          key={aircraft.aircraft_uuid}
                        />
                      ))}

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
                  </>
                }
              </TabPanel>  
            }
            
            {/* Tab 2 Aircraft Models */}
            {edit ?
              <TabPanel value={value} index={1}>
                <EditAircraftModel
                  model={editAircraftModel}
                  crewPositions={props.crewPositions}
                  handleDeleteModel={handleDeleteModel}
                  handleModelEdit={handleModelEdit}
                />
              </TabPanel>
              :
              <TabPanel value={value} index={1}>
                {addNew ?
                  <> {/* Add New Model to database */}
                    <NewModel 
                      aircraftModels={props.aircraftModels}
                      crewPositions={props.crewPositions}
                      handleNewModel={handleNewModel}
                    />
                  </>
                  :
                  <> {/* Aircraft Model List */}
                    <Paper data-testid='aircrafts-models' className={classes.mainList}>
                      <Grid container className={classes.cardList}>

                        {props.aircraftModels.map((model, index) => (
                          <Grid item md={6} key={index} style={{height: '185px'}}>
                            <AircraftModels
                              model={model}
                              handleModelEdit={handleModelEdit}
                              key={model.model_uuid}
                            />
                          </Grid>
                        ))}  
                        {/* New Model button */}
                        <Grid item md={6} style={{height: '185px'}}>
                          <Paper className={classes.newButtonPaper}>
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
                    </Paper>
                  </>
                }
              </TabPanel>  
            } 

            {/* Tab 3 Aircraft Crew */}
            {edit ?
              <TabPanel value={value} index={2}>
                <EditCrew
                  position={editCrew}
                  handleDeleteCrew={handleDeleteCrew}
                  handleCrewEdit={handleCrewEdit}
                />
              </TabPanel>
              :
              <TabPanel value={value} index={2}>
                {addNew ?
                  <> {/* Add New Crew Position to database */}
                    <NewCrew
                      handleNewCrew={handleNewCrew}
                    />
                  </>  
                  :
                  <> {/* Aircraft Crew List */} 
                    <Paper data-testid='aircrafts-crew' className={classes.mainList}>
                      <Grid container className={classes.cardList}>
                        {props.crewPositions.map((pos, index) => (
                          <Grid item md={6} key={index} style={{height: '185px'}}>
                            <AircraftCrew
                              position={pos}
                              handleCrewEdit={handleCrewEdit}
                              key={pos.crew_position_uuid}
                            />
                          </Grid>
                        ))}  
                        {/* New Position button */}
                        <Grid item md={6} style={{height: '185px'}}>
                          <Paper className={classes.newButtonPaper}>
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
                    </Paper>
                  </>
                }
              </TabPanel>  
            }
          </Grid>

        </Grid>
        
      </Paper>
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