import React, { useEffect, useState } from "react";
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
  Container,
} from "@material-ui/core";
import {
  green,
} from "@material-ui/core/colors";
import ActiveUsers from "./ActiveUsers";
import PendingUsers from "./PendingUsers";
import EditUser from "./EditUser.js";
import TabControlUser from './TabControlUser.js';
import { 
  setAirmen,
} from "../../Redux/actions";
import { connect } from "react-redux";

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
  userList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '700px',
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
      id={`admin-users-${index}`}
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

function Users(props) {
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  // const [addNew, setAddNew] = useState(false);
  const [pendingUsers, setPendingUsers] = useState([]);
  const [approveUserList, setApproveUserList] = useState([]);
  const [userList, setUserList ] = useState(props.airmen);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApproveAll = (users = null) => {
    if (!users) return;
    console.log(users)
    axios
      .patch(
        "/user/approval/",
        {
          approve: users
        }
      )        
      .then((response) => {
        console.log("Response from Approve All:", response);
        setUserList(users);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  };

  const handleEdit = (user = null) => {
    if (!edit) {
      setEditUser(user);
      setEdit(true);
    } else {
      setEdit(false);
      if (!user) return;
      axios
        .patch("/user/" + user.account_uuid,
          {
            first_name: user.first_name,
            last_name: user.last_name,
            pilot_stauts: user.pilot_stauts,
            rank_uuid: user.rank_uuid,
            role: user.role,
            user_status: user.user_status,
          }
        )
        .then((response) => {
          console.log("Response from Patch User:", response);
        })
        .catch((error) => {
          console.log("Error:", error);
        })
    }
  };

  // const handleNewUser = (user = null) => {
  //   if (!addNew) {
  //     setAddNew(true);
  //   } else {
  //     setAddNew(false);
  //     if (!user) return;
  //   }
  // }

  useEffect(() => {
    axios
      .get("/user/nonapproved")
      .then((response) => {
        console.log("Response Data Users:", response.data.users)
        setPendingUsers(response.data.users)
      })
      .catch((error) => {
        console.log("Get Error:", error);
      });
  }, [])

  return (
    <Container maxWidth='lg'>
      <Paper container className={classes.container} direction='column'>
        
        <Grid item className={classes.title}>
          <Typography variant='h2'>
            Users
          </Typography>
        </Grid>

        <Grid item style={{height: '45px'}}>
          <AppBar position="static" className={classes.appBar}>
            {edit ?
              <TabControlUser 
                handleChange={handleChange}
                value={value}
              />
              :
              <Tabs value={value}  indicatorColor='primary' onChange={handleChange}>
                <Tab label="Users" />
                <Tab label="New Users Approval" />
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
            {/* Tab 1 Active Users */}
            {edit ? 
              <TabPanel value={value} index={0}>
                <Paper className={classes.userList}>
                  <EditUser 
                    user={editUser} 
                    handleEdit={handleEdit} 
                  />
                </Paper>
              </TabPanel>
              : 
              <TabPanel value={value} index={0}>
                {/* Active User List */}
                <Paper className={classes.userList}>
                  <Grid container item xs={12} md={12} className={classes.labelBar}>
                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>First Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant='subtitle1'>Last Name</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant='subtitle1'>Rank</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant='subtitle1'>Role</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Typography variant='subtitle1'>Status</Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='fullWidth' />
                  {userList.map(user => (
                    <ActiveUsers 
                      user={user}
                      handleEdit={handleEdit}
                      key={user.account_uuid}
                    />
                  ))}

                </Paper>
              </TabPanel>
            }

            {/* Tab 2 Pending Users */}
            <TabPanel value={value} index={1}>
              <Paper className={classes.userList}>
                <Grid container item xs={12} md={12} style={{marginBottom: '10px', paddingLeft: '10px'}}>
                  <Grid item xs={3}>
                    <Typography variant='h6'>First Name</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant='h6'>Last Name</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant='h6'>Rank</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant='h6'>Role</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant='h6'>Status</Typography>
                  </Grid>
                  
                  {pendingUsers.map(user => (
                    <PendingUsers 
                      user={user}
                      handleEdit={handleEdit}
                      setApproveUserList={setApproveUserList}
                      approveUserList={approveUserList}
                      key={user.account_uuid}
                    />
                  ))}

                  {/* Approve Users Button */}
                  <Grid container item xs={12} md={12}>
                    <Paper className={classes.newUserBt}>
                      <Button 
                        fullWidth={true}
                        size="large"
                        onClick={()=>handleApproveAll(approveUserList)}
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
            </TabPanel>
          </Grid>
        </Grid>

      </Paper>
    </Container>
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