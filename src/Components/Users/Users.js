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
import { green, grey, blueGrey } from "@material-ui/core/colors";
import { fade } from "@material-ui/core/styles/colorManipulator";
import ActiveUsers from "./ActiveUsers";
import PendingUsers from "./PendingUsers";
import EditUser from "./EditUser.js";
import TabControlUser from "./TabControlUser.js";
import { setPending } from "../../Redux/actions";
import { connect } from "react-redux";
import { WebSocketFrame } from "../WebSocket/WebSocket.js";

const useStyles = makeStyles((theme) => ({
  container: {
    minHeight: "92vh",
    maxHeight: "100%",
    height: "75%",
  },
  title: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(4),
    height: "125px",
  },
  appBar: {
    backgroundColor: theme.palette.primary.main,
  },
  infoBoxes: {
    height: "775px",
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  infoLabels: {
    textAlign: "center",
    margin: "15px",
    borderRadius: "3px",
    color: "white",
    backgroundColor: theme.palette.primary.main,
  },
  quickInfo: {
    height: "300px",
    width: "200px",
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: fade(grey[300], 0.25),
  },
  countBackground: {
    backgroundColor: fade(grey[900], 0.1),
    borderRadius: "25%",
    margin: "1px",
    marginRight: "5px",
    marginLeft: "20px",
    textAlign: "center",
  },
  search: {
    height: "400px",
    width: "200px",
    margin: "10px",
    borderRadius: "5px",
    backgroundColor: fade(grey[300], 0.25),
  },
  mainInfo: {
    height: "775px",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  userList: {
    padding: theme.spacing(1),
    height: '715px',
    width: '800px',
    maxHeight: '715px',
    backgroundColor: fade(grey[300], 0.25),
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
  newUserBt: {
    background: "#F1F1F1",
    height: "50px",
    width: "100%",
    opacity: "40%",
    marginTop: "10px",
  },
  fixedHeight: {
    height: 800,
  },
  labels: {
    padding: theme.spacing(2),
  },
  "@global": {
    "*::-webkit-scrollbar": {
      width: "10px",
    },
    "*::-webkit-scrollbar-track": {
      borderRadius: "10px",
      background: fade(blueGrey[100], 0.5),
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.5)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: fade(blueGrey[600], 0.3),
      borderRadius: "5px",
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.05)",
    },
    "*::-webkit-scrollbar-thumb:window-inactive": {
      backgroundColor: fade(blueGrey[300], 0.3),
    },
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
  const [approveUserList, setApproveUserList] = useState([]);

  console.log("Props airmen", props.airmen);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApproveAll = (users) => {
    if (!users) return;
    console.log("Approve users", users);
    WebSocketFrame.airmanHandler("approve", { users });
  };

  const handleEdit = (user) => {
    if (!edit) {
      setEditUser(user);
      setEdit(true);
    } else {
      setEdit(false);
      if (!user) return;
      console.log("Edit user", user);
      WebSocketFrame.airmanHandler("edit", user);
      // axios
      //   .patch("/user/" + user.account_uuid,
      //     {
      //       first_name: user.first_name,
      //       last_name: user.last_name,
      //       pilot_stauts: user.pilot_stauts,
      //       rank_uuid: user.rank_uuid,
      //       role: user.role,
      //       user_status: user.user_status,
      //     }
      //   )
      //   .then((response) => {
      //     console.log("Response from Patch User:", response);
      //   })
      //   .catch((error) => {
      //     console.log("Error:", error);
      //   })
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
        console.log("Response Data Users:", response.data.users);
        // setPendingUsers(response.data.users);
        props.pendingAction(response.data.users);
      })
      .catch((error) => {
        console.log("Get Error:", error);
      });
  }, []);

  const userInventory = (user = null) => {
    if (!user) return;
    let searchList = [...props.airmen];
    return searchList.filter((item) => item.role === user.role).length;
  };

  const statusInventory = (user = null) => {
    if (!user) return;
    let searchList = [...props.airmen];
    return searchList.filter((item) => item.user_status === user.user_status)
      .length;
  };

  return (
    <Container maxWidth="lg" style={{ paddingLeft: "50px" }}>
      <Paper className={classes.container} direction="column">
        <Grid item className={classes.title}>
          <Typography variant="h2">Users</Typography>
        </Grid>
        <Grid item style={{ height: "45px" }}>
          <AppBar position="static" className={classes.appBar}>
            {edit ? (
              <TabControlUser handleChange={handleChange} value={value} />
            ) : (
              <Tabs
                value={value}
                indicatorColor="secondary"
                onChange={handleChange}
              >
                <Tab label="Users" />
                <Tab label="New Users Approval" />
              </Tabs>
            )}
          </AppBar>
        </Grid>
        <Grid container item direction="row" style={{ marginTop: "30px" }}>
          {/* Quick info and Search boxes */}
          <Grid
            container
            item
            md={3}
            direction="column"
            className={classes.infoBoxes}
          >
            {/* Database info */}
            <Paper className={classes.quickInfo}>
              <div className={classes.infoLabels}>
                <Typography variant="subtitle2">Summary</Typography>
              </div>
              <Grid
                container
                direction="row"
                style={{
                  alignItems: "center",
                  paddingBottom: "15px",
                  paddingLeft: "15px",
                }}
              >
                <Grid container item xs={7} direction="column">
                  <Typography
                    variant="h6"
                    style={{ paddingLeft: "10px", color: blueGrey[900] }}
                  >
                    Airmen
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ paddingLeft: "15px", fontStyle: "italic" }}
                  >
                    User
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ paddingLeft: "15px", fontStyle: "italic" }}
                  >
                    Scheduler
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ paddingLeft: "15px", fontStyle: "italic" }}
                  >
                    Admin
                  </Typography>
                </Grid>

                <Grid
                  container
                  item
                  xs={3}
                  direction="column"
                  style={{ paddingTop: "10px" }}
                >
                  <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {props.airmen.length}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {userInventory({ role: "User" })}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {userInventory({ role: "Scheduler" })}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {userInventory({ role: "Admin" })}
                  </Typography>
                </Grid>
              </Grid>
              <Divider variant="middle" />
              <Grid
                container
                direction="row"
                style={{
                  alignItems: "center",
                  paddingTop: "10px",
                  paddingLeft: "15px",
                }}
              >
                <Grid container item xs={7} direction="column">
                  <Typography
                    variant="h6"
                    style={{ paddingLeft: "10px", color: blueGrey[900] }}
                  >
                    Availability
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ paddingLeft: "15px", fontStyle: "italic" }}
                  >
                    Available
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{ paddingLeft: "15px", fontStyle: "italic" }}
                  >
                    Unavailable
                  </Typography>
                  {/* <Typography
                    variant="caption"
                    style={{ paddingLeft: "15px", fontStyle: "italic" }}
                  >
                    Vacation
                  </Typography> */}
                </Grid>
                <Grid
                  container
                  item
                  xs={3}
                  direction="column"
                  style={{ paddingTop: "30px" }}
                >
                  <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {statusInventory({ user_status: "Available" })}
                  </Typography>
                  <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {statusInventory({ user_status: "Unavailable" })}
                  </Typography>
                  {/* <Typography
                    variant="caption"
                    className={classes.countBackground}
                  >
                    {statusInventory({ user_status: "Vacation" })}
                  </Typography> */}
                </Grid>
              </Grid>
            </Paper>
            {/* Search system */}
            <Paper className={classes.search}>
              <div className={classes.infoLabels}>
                <Typography variant="subtitle2">Search</Typography>
              </div>
            </Paper>
          </Grid>

          <Grid
            container
            item
            md={9}
            direction="column"
            className={classes.mainInfo}
          >
            {/* Tab 1 Active Users */}
            {edit ? (
              <TabPanel value={value} index={0}>
                <Paper className={classes.userList}>
                  <EditUser 
                    user={editUser} 
                    handleEdit={handleEdit} 
                    metaPositions={props.metaPositions}
                  />
                </Paper>
              </TabPanel>
            ) : (
              <TabPanel value={value} index={0}>
                {/* Active User List */}
                <Paper className={classes.userList}>
                  <Grid
                    container
                    item
                    xs={12}
                    md={12}
                    className={classes.labelBar}
                  >
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">First Name</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography variant="subtitle1">Last Name</Typography>
                    </Grid>
                    <Grid item xs={2}>
                    <Typography variant="subtitle1">Role</Typography>
                    </Grid>
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">Status</Typography>
                    </Grid>
                  </Grid>
                  <Divider variant='fullWidth' style={{ marginBottom: '5px' }} />
                  <Grid 
                    container 
                    item
                    style={{ display: 'flex', overflowY: 'auto', maxHeight: '650px' }}
                  >
                    {props.airmen.map((user) => (
                      <ActiveUsers
                        user={user}
                        handleEdit={handleEdit}
                        key={user.account_uuid}
                      />
                    ))}
                  </Grid>
                </Paper>
              </TabPanel>
            )}

            {/* Tab 2 Pending Users */}
            <TabPanel value={value} index={1}>
              <Paper className={classes.userList}>
                <Grid
                  container
                  item
                  xs={12}
                  md={12}
                  className={classes.labelBar}
                >
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">First Name</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography variant="subtitle1">Last Name</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="subtitle1">Role</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography variant="subtitle1">Status</Typography>
                  </Grid>
                </Grid>
                <Divider variant="fullWidth" />
                {props.pendingUsers && props.pendingUsers.map((user) => (
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
                      onClick={() => handleApproveAll(approveUserList)}
                      style={{
                        color: green[500],
                        minHeight: "100%",
                      }}
                    >
                      Submit
                    </Button>
                  </Paper>
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
    airmen: state.airmenReducer.users,
    metaPositions: state.metaPositionReducer,
    pendingUsers: state.airmenReducer.pending,
    unapprovedUsers: state.unapprovedUsersReducer,
  };
};

const mapDispatchToProps = {
  pendingAction: setPending,
  // unapprovedUsersAction: setUnapprovedUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);
