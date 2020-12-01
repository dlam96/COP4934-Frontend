import React, { useEffect, useState } from "react";
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
import { Add } from "@material-ui/icons";
import { green, grey, blueGrey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

import { setAircraftModels, setAircrafts, setCrewPostions } from '../../Redux/actions.js';
import { WebSocketFrame } from "../WebSocket/WebSocket.js";
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
import FilterAircraft from './FilterAircraft.js';

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: '92vh',
    maxHeight: '100%',
    height: '75%',
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
    height: '775px',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  infoLabels: {
    textAlign: 'center',
    margin: '15px',
    borderRadius: '3px',
    color: 'white',
    backgroundColor: theme.palette.primary.main,
  },
  quickInfo: {
    height: '300px',
    width: '200px',
    margin: '10px',
    borderRadius: '5px',
    backgroundColor: fade(grey[300], 0.25),
  },
  countBackground: {
    backgroundColor: fade(grey[900], 0.1),
    borderRadius: '25%',
    margin: '1px',
    marginRight: '5px',
    marginLeft: '20px', 
    textAlign: 'center',
  },
  search: {
    height: '400px',
    width: '200px',
    margin: '10px',
    borderRadius: '5px',
    backgroundColor: fade(grey[300], 0.25),
  },
  mainInfo: {
    height: '775px',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  mainList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '800px',
    minWidth: '600px',
    maxWidth: '800px',
    maxHeight: '715px',
    backgroundColor: fade(grey[300], 0.25),
    flexGrow: '1',
  },
  modelList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '800px',
    minWidth: '600px',
    maxWidth: '800px',
    maxHeight: '715px',
    overflowY: 'auto',
    backgroundColor: fade(grey[300], 0.25),
    flexGrow: '1',
  },
  crewList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '800px',
    minWidth: '600px',
    maxWidth: '800px',
    maxHeight: '715px',
    overflowY: 'auto',
    backgroundColor: fade(grey[300], 0.25),
    flexGrow: '1',
  },
  labelBar: {
    backgroundColor: theme.palette.primary.main,
    padding: '1px',
    marginBottom: '5px', 
    borderRadius: '5px',
    color: 'white',
    justifyContent: 'space-around',
    justifyContent: 'center',
  },
  newAircraftBt: {
    background: '#F1F1F1',
    height: '50px',
    width: '100%',
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
  '@global': {
    '*::-webkit-scrollbar': {
      width: '10px'
    },
    '*::-webkit-scrollbar-track': {
      borderRadius: '10px',
      background: fade(blueGrey[100], 0.50),
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.5)'
    },
    '*::-webkit-scrollbar-thumb': {
      backgroundColor: fade(blueGrey[600], 0.3),
      borderRadius: '5px',
      '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.05)',
    },
    '*::-webkit-scrollbar-thumb:window-inactive': {
      backgroundColor: fade(blueGrey[300], 0.3),
    },
  } 
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

  useEffect(() => {
    console.log("new State Props Aircrafts:", props.aircrafts)
    setAircraftList(props.aircrafts);
  }, [props.aircrafts]);


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

      WebSocketFrame.aircraftHandler("edit", { aircraft_uuid: aircraft.aircraft_uuid, status: aircraft.status });
      // axios
      //   .patch("/aircraft/" + aircraft.aircraft_uuid,
      //   {
      //     status: aircraft.status,
      //   })
      //   .then((response) => {
      //     console.log("Response from Post:", response);
      //     setAircraftList(updatedAircrafts);
      //   })
      //   .catch((error) => {
      //     console.log("Error:", error);
      //   })
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
      WebSocketFrame.aircraftHandler("add", { model_uuid: aircraft.model_uuid, status: aircraft.status, tail_code: aircraft.tail_code, });
      // axios
      //   .post(
      //     "/aircraft",
      //     {
      //       model_uuid: aircraft.model_uuid,
      //       status: aircraft.status,
      //       tail_code: aircraft.tail_code,
      //     },
      //     { headers: { "Content-Type": "application/json" } }
      //   )
      //   .then((response) => {
      //     console.log("Response from Post:", response);
      //   })
      //   .catch((error) => {
      //     console.log("Error:", error);
      //   })
    }
  }

  const handleNewModel = (model = null) => {
    if (!addNew) {
      setAddNew(true);
    } else {
      setAddNew(false);
      if (!model) return;
      // console.log('Testing model', model.model_name, model.positions)
      console.log("Positions:", model.positions);
      model.positions = model.positions.filter((position) => position.crew_position_uuid !== '');
      WebSocketFrame.aircraftModelHandler("add", { model_name: model.model_name, positions: model.positions})
      // axios
      //   .post(
      //     "aircraft_model",
      //     {
      //       model_name: model.model_name,
      //       positions: model.positions,
      //     },
      //     { headers: { "Content-Type": "application/json" }}
      //   )
      //   .then((response) => {
      //     console.log("Response from Post Model:", response.data);
      //   })
      //   .catch((error) => {
      //     console.log("Error:", error)
      //   })
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
    WebSocketFrame.aircraftHandler("delete", { aircraft_uuid: aircraft.aircraft_uuid });
    // axios
    //   .delete("/aircraft/" + aircraft.aircraft_uuid)
    //   .then((response) => {
    //     console.log("Response from delete Aircraft:", response);
    //     console.log("Delete Model:", aircraft)
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   })
  }

  const handleDeleteModel = (model = null) => {
    if (!model) return;
    WebSocketFrame.aircraftModelHandler("delete", { model_uuid: model.model_uuid });
    // axios
    //   .delete("/aircraft_model/" + model.model_uuid)
    //   .then((response) => {
    //     console.log("Response from delete Model:", response);
    //   })
    //   .catch((error) => {
    //     console.log("Error:", error);
    //   })
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

  const aircraftInventory = (craft = null) => {
    if (!craft) return;
    let searchList = [...aircraftList]
    return searchList.filter((item) => item.model_uuid === craft.model_uuid).length
  }

  const statusInventory = (craft = null) => {
    if (!craft) return;
    let searchList = [...aircraftList]
    return searchList.filter((item) => item.status === craft.status).length
  }

  const applyFilter = ( craft = null ) => {
    if (craft.model_uuid && craft.tail_code) {
      let newAircraftList = [...aircraftList];
      setAircraftList(
        newAircraftList.filter((item) => (item.model_uuid === craft.model_uuid && item.tail_code === ('MY' + craft.tail_code )))
      );
    } else if (craft.model_uuid) {
      let newAircraftList = [...aircraftList];
      setAircraftList(
        newAircraftList.filter((item) => item.model_uuid === craft.model_uuid)
      );
    } else if (craft.tail_code) {
      let newAircraftList = [...aircraftList];
      setAircraftList(
        newAircraftList.filter((item) => item.tail_code === ('MY' + craft.tail_code ))
      );
    }
  }

  const clearFilter = () => {
    console.log('Filter cleared', aircraftList);
    setAircraftList(props.aircrafts)
  }

  return (
    <Container maxWidth='lg' style={{ paddingLeft: '50px' }}>
      <Paper className={classes.container} direction='column'>
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
              <Tabs value={value} indicatorColor="secondary" onChange={handleChange}>
                <Tab label="Aircrafts" />
                <Tab label="Models" />
                <Tab label="Crew" />
              </Tabs> 
            }
          </AppBar>
        </Grid>

        <Grid container item direction='row' style={{ marginTop: '30px' }}>
          {/* Quick info and Search boxes */}
          <Grid container item md={3} direction='column' className={classes.infoBoxes}>
            {/* Database info */}
            <Paper className={classes.quickInfo}>
              <div className={classes.infoLabels}>
                <Typography variant='subtitle2'>Summary</Typography>
              </div>
              <Grid container direction='row' style={{ alignItems: 'center', paddingBottom: '15px', paddingLeft: '10px' }}>
                <Grid container item xs={8} direction='column' >
                  <Typography variant='h6' style={{ paddingLeft: '10px', color: blueGrey[900] }}>
                    Aircrafts
                  </Typography>
                  <Typography variant='caption' style={{ paddingLeft: '15px', fontStyle: 'italic' }}>
                    HC-130J C.K. II
                  </Typography>
                  <Typography variant='caption' style={{ paddingLeft: '15px', fontStyle: 'italic' }}>
                    HH-60 Pave Hawk
                  </Typography>
                  <Typography variant='caption' style={{ paddingLeft: '15px', fontStyle: 'italic' }}>
                    A-10C Thunderbolt II
                  </Typography>
                </Grid>
                <Grid container item xs={3} direction='column' style={{ paddingTop: '10px' }}>
                  <Typography variant='caption' className={classes.countBackground}>
                    {aircraftList.length}
                  </Typography>
                  <Typography variant='caption' className={classes.countBackground}>
                    {aircraftInventory(props.aircraftModels[0])}
                  </Typography>
                  <Typography variant='caption' className={classes.countBackground}>
                    {aircraftInventory(props.aircraftModels[1])}
                  </Typography>
                  <Typography variant='caption' className={classes.countBackground}>
                    {aircraftInventory(props.aircraftModels[2])}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant='middle' />
              <Grid container direction='row' style={{ alignItems: 'center', paddingTop: '10px', paddingLeft: '10px' }}>
                <Grid container item xs={8} direction='column'>
                  <Typography variant='h6' style={{ paddingLeft: '10px', color: blueGrey[900] }}>
                    Availability
                  </Typography>
                  <Typography variant='caption' style={{ paddingLeft: '15px', fontStyle: 'italic' }}>
                    Available
                  </Typography>
                  <Typography variant='caption' style={{ paddingLeft: '15px', fontStyle: 'italic' }}>
                    Unavailable
                  </Typography>
                  <Typography variant='caption' style={{ paddingLeft: '15px', fontStyle: 'italic' }}>
                    Maintenance
                  </Typography>
                </Grid>
                <Grid container item xs={3} direction='column' style={{ paddingTop: '30px' }}>
                  <Typography variant='caption' className={classes.countBackground}>
                    {statusInventory({ status: 'Available' })}
                  </Typography>
                  <Typography variant='caption' className={classes.countBackground}>
                    {statusInventory({ status: 'Unavailable' })}
                  </Typography>
                  <Typography variant='caption' className={classes.countBackground}>
                    {statusInventory({ status: 'Maintenance' })}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            {/* Filter system */}
            <Paper className={classes.search}>
              <div className={classes.infoLabels}>
                <Typography variant='subtitle2'>Filter</Typography>
              </div>
              <Grid container direction='column'>
                <FilterAircraft 
                  applyFilter={applyFilter}
                  clearFilter={clearFilter}
                />
              </Grid>
            </Paper>
          </Grid>

          <Grid container item md={9} direction='column' className={classes.mainInfo}>
            {/* ----------------------
            Tab 1 Active Aircrafts
            ---------------------- */}
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
                      <Grid container item className={classes.labelBar}>
                        <Grid item xs={1} />
                        <Grid item xs={4}>
                          <Typography variant='subtitle1'>Model</Typography>
                        </Grid>
                        <Grid item xs={3}>
                          <Typography variant='subtitle1'>Tail Code</Typography>
                        </Grid>
                        <Grid item xs={2}>
                          <Typography variant='subtitle1'>Status</Typography>
                        </Grid>
                      </Grid>
                      <Divider variant='fullWidth' style={{ marginBottom: '5px' }}/>
                      <Grid container item style={{ overflowY: 'auto', maxHeight: '600px' }}>
                        {aircraftList.map(aircraft => (
                          <ActiveAircrafts
                            aircraft={aircraft}
                            aircraftModels={props.aircraftModels}
                            handleEdit={handleEdit}
                            key={aircraft.aircraft_uuid}
                          />
                        ))}
                      </Grid>
                      {/* New Aircraft button */}
                      <Grid container item>
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
            {/* ---------------------
            Tab 2 Aircraft Models
            --------------------- */}
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
                    <Paper className={classes.modelList}>
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
            {/* -------------------
            Tab 3 Aircraft Crew
            ------------------- */}
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
                    <Paper className={classes.crewList}>
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