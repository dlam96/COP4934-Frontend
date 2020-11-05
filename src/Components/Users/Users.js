import React, { useEffect, useState } from "react";
import clsx from "clsx";
import axios from "axios";
import {
  Grid,
  Paper,
  makeStyles,
  AppBar,
  Tabs,
  Tab,
  Button,
  Typography,
  Box,
  Divider,
} from "@material-ui/core";
import {
  Add,
} from "@material-ui/icons";
import {
  green,
} from "@material-ui/core/colors";
import ActiveUsers from "./ActiveUsers";
import PendingUsers from "./PendingUsers";
import EditUser from "./EditUser.js";
import { 
  setAirmen,
  setUnapprovedUsers,
} from "../../Redux/actions";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2),
    background: '#96a1a7',
    height: '1000px',
    width: '1200px',
    borderRadius: '10px',
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
  userList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '700px',
    maxHeight: '715px',
    background: '#878787',
  },
  newUserBt: {
    background: '#F1F1F1',
    height: '50px',
    width: '100%',
    opacity: '40%',
    marginTop: '10px',
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 800,
  },
  labels: {
    padding: theme.spacing(2),
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
          <Typography component={"span"} variant={"body2"}>
            {children}
          </Typography>
        </Box>
      )}
    </div>
  );
}

function Users(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [userList, setUserList] = useState(props.airmen);
  const [addNew, setAddNew] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEdit = (user = null) => {
    if (!edit) {
      setEditUser(user);
      setEdit(true);
    } else {
      setEdit(false);
      if (!user) return;
    }
  };

  const handleNewUser = (user = null) => {
    if (!addNew) {
      setAddNew(true);
    } else {
      setAddNew(false);
      if (!user) return;
    }
  }

  useEffect(() => {
    axios
      .get("/user/approval")
      .then((response) => {
        console.log("Response Data Users:", response.data)
        // unapprovedUsersAction(response.data);
      })
      .catch((error) => {
        console.log("Get Error:", error);
      });
  }, [])

  return (
    <Grid container className={classes.container} direction='column'>
      
      <Grid item className={classes.title}>
        <Typography variant='h2'>
          Users
        </Typography>
      </Grid>

      <Grid item style={{height: '45px'}}>
        <AppBar position="static" className={classes.appBar}>
          <Tabs value={value}  indicatorColor='primary' onChange={handleChange}>
            <Tab label="Users" />
            <Tab label="New Users Approval" />
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
          {/* Tab 1 Active Users */}
          {edit ? (
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Paper className={classes.userList}>
                  <EditUser 
                    user={editUser} 
                    handleEdit={handleEdit} 
                  />
                </Paper>
              </Grid>
            </TabPanel>
          ) : (
            <TabPanel value={value} index={0}>
              {addNew ?
                <Grid container spacing={2}>
                  {/* Add New User to database */}
                  {/* <NewUser 
                    // TODO NewUser.js
                  /> */}
                </Grid>
                :
                <Grid container spacing={2}>
                  {/* Active User List */}
                  <Paper className={classes.userList}>
                    <Grid container item xs={12} md={12} style={{marginBottom: '10px', paddingLeft: '10px'}}>
                      <Grid item xs={3}>
                        <Typography variant='h6'>
                          First Name
                        </Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <Typography variant='h6'>
                          Last Name
                        </Typography>
                      </Grid>
                      <Grid item xs={2}>
                        <Typography variant='h6'>
                          Rank
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant='h6'>
                          Role  
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Typography variant='h6'>
                          Status
                        </Typography>
                      </Grid>
                      <Divider variant='fullWidth' />

                      {userList.map(user => (
                        <ActiveUsers 
                          user={user}
                          handleEdit={handleEdit}
                          key={user.account_uuid}
                        />
                      ))}

                      {/* New User Button */}
                      {/* <Grid container item xs={12} md={12}>
                        <Paper className={classes.newUserBt}>
                          <Button 
                            startIcon={<Add />}
                            fullWidth={true}
                            size="large"
                            // onClick={()=>handleNewUser()}
                            style={{
                              color: green[500],
                              minHeight: '100%',
                            }}
                          />
                        </Paper>
                      </Grid> */}
                    </Grid>
                  </Paper>
                </Grid>
              }
            </TabPanel>
          )}

          {/* Tab 2 Pending Users */}
          <TabPanel value={value} index={1}>
            <Grid container spacing={2}>
              <Paper className={classes.userList}>
                <Grid container item xs={12} md={12} style={{marginBottom: '10px', paddingLeft: '10px'}}>
                  <Grid item xs={3}>
                    <Typography variant='h6'>
                      First Name
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='h6'>
                      Last Name
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='h6'>
                      Rank
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant='h6'>
                      Role  
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant='h6'>
                      Status
                    </Typography>
                  </Grid>
                  
                    {userList.map(user => (
                      <PendingUsers 
                        user={user}
                        handleEdit={handleEdit}
                        key={user.account_uuid}
                      />
                    ))}

                  {/* New User Button */}
                  <Grid container item xs={12} md={12}>
                    <Paper className={classes.newUserBt}>
                      <Button 
                        fullWidth={true}
                        size="large"
                        // onClick={()=>handleNewUser()}
                        style={{
                          color: green[500],
                          minHeight: '100%',
                        }}
                      >
                        Submit
                      </Button>
                    </Paper>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>

          </TabPanel>

        </Grid>
      </Grid>

    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    airmen: state.airmenReducer,
    unapprovedUsers: state.unapprovedUsersReducer,
  }
}

const mapDispatchToProps = {
  airmenAction: setAirmen,
  // unapprovedUsersAction: setUnapprovedUsers,
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)