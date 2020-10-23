import React, { useEffect, useState } from "react";
import clsx from "clsx";
import axios from 'axios';
import { 
  Container,
  Grid, 
  Paper, 
  makeStyles, 
  AppBar, 
  Tabs, 
  Tab, 
  Button,
  Typography,
  Box,
} from "@material-ui/core";
import ActiveUsers from "./ActiveUsers";
import PendingUsers from "./PendingUsers";
import EditUser from "./EditUser.js";

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
  },
  fixedHeight: {
    height: 800,
  },
  labels: {
    padding: theme.spacing(2),
  },
}));

const testUsers = [
  { firstName: "John", lastName: "Doe", militaryId: "***453", rank: "O1", pStatus: "Training", role: "Flight Engineer", uStatus: "Available" },
  { firstName: "Jane", lastName: "Doe", militaryId: "***367", rank: "O2", pStatus: "PTO - Vacation", role: "Pilot", uStatus: "Unavailable"},
  { firstName: "Joe", lastName: "Schmoe", militaryId: "***533", rank: "O3", pStatus: "Training", role: "Pilot", uStatus: "Available" },
  { firstName: "Jane", lastName: "Bloggs", militaryId: "***432", rank: "O4", pStatus: "Training", role: "Flight Engineer", uStatus: "Available" },
  { firstName: "Juan", lastName: "Perez", militaryId: "***543", rank: "O5", pStatus: "Training", role: "Flight Engineer", uStatus: "Available" },
  { firstName: "Sammy", lastName: "Soe", militaryId: "***414", rank: "O6", pStatus: "Training", role: "Flight Engineer", uStatus: "Unavailable" },
  { firstName: "Marty", lastName: "McFly", militaryId: "***187", rank: "O7", pStatus: "Training", role: "Flight Engineer", uStatus: "Unavailable" },
  { firstName: "Shoto", lastName: "Todoroki", militaryId: "***191", rank: "O8", pStatus: "Training", role: "Flight Engineer", uStatus: "Available" },
  { firstName: "Nezuko", lastName: "Kamado", militaryId: "***478", rank: "O9", pStatus: "Training", role: "Flight Engineer", uStatus: "Available" },
  { firstName: "Mikasa", lastName: "Ackerman", militaryId: "***983", rank: "O10", pStatus: "Training", role: "Flight Engineer", uStatus: "Unavailable" },
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

export default function Users() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState(testUsers);

  const [approveUsers, setApproveUsers] = useState(null);
  setApproveUsers(testUsers);
  // const [checkedUsers, setCheckedUsers] = useState(pendingUsers);

  useEffect(() => {
    axios.get('/approval')
      .then((response) => {
        console.log("Users:", response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      })
  }, [])

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
      let newUsers = [...users];
      let index = newUsers.findIndex((element) => element.militaryId === user.militaryId)
      newUsers[index] = user;
      setUsers(newUsers);
    }
  };

  // TODO Approve Users
  // const handleApprove = (user = null) => {
  //   if (!user) return;
  //   let pendUsers = [...checkedUsers];
  //   pendUsers.push(user);
  //   setCheckedUsers(pendUsers);
  // };

  // const handleApproveAll = () => {
  //   console.log(checkedUsers);
  // };

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>

        <AppBar position="static">
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Users" />
            <Tab label="New Users Approval" />
          </Tabs> 
        </AppBar>

        <Paper className={fixedHeightPaper} variant="outlined">

          {/* Active Users */}
          {edit ?
            <TabPanel value={value} index={0}>
              <EditUser 
                user={editUser}
                handleEdit={handleEdit}
              /> 
            </TabPanel>
            :
            <TabPanel value={value} index={0}>
              <Grid container item className={classes.labels}>
                <Grid item xs={2} align="start">First Name</Grid>
                <Grid item xs={3} align="start">Last Name</Grid>
                <Grid item xs={2} align="start">ID</Grid>
                <Grid item xs={2} align="start">Rank</Grid>
              </Grid>
              
              {users.map(user => (
                <ActiveUsers
                  user={user}
                  handleEdit={handleEdit}
                  key={user.militaryId}
                />
              ))}
            </TabPanel>
          }

          {/* Users Waiting for Approval */}
          <TabPanel value={value} index={1}>

            <Grid container item direction="row" className={classes.labels}>
              <Grid item xs={2} align="start">
                First Name
              </Grid>
              <Grid item xs={3} align="start">
                Last Name
              </Grid>
              <Grid item xs={2} align="start">
                ID
              </Grid>
              <Grid item xs={2} align="start">
                Rank
              </Grid>
            </Grid>

            {approveUsers.map(user => (
              <PendingUsers
                user={user}
                // handleApprove={handleApprove}
                key={user.militaryId}
              />
            ))}  

            <Grid container direction="row" align="right">
              <Button
                variant="contained"
                // onClick={() => handleApproveAll()}
              >
                Submit All
              </Button>
            </Grid>

          </TabPanel>  
          
        </Paper>

        </Grid>
      </Grid>
    </Container>
  );
}
