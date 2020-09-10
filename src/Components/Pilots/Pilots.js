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
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
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
  { firstName: "John", lastName: "Doe", militaryId: "12345", rank: "O1" },
  { firstName: "Jane", lastName: "Doe", militaryId: "24567", rank: "O2" },
  { firstName: "Luke", lastName: "Skywalker", militaryId: "11111", rank: "O3" },
  { firstName: "Tony", lastName: "Stark", militaryId: "22222", rank: "O4" },
  { firstName: "Anderson", lastName: "Silva", militaryId: "33333", rank: "O5" },
  { firstName: "Jon", lastName: "Jones", militaryId: "44444", rank: "O6" },
  { firstName: "Khabib", lastName: "Nurmagomedov", militaryId: "55555", rank: "O7" },
  { firstName: "Georges", lastName: "St-Pierre", militaryId: "66666", rank: "O8" },
  { firstName: "Fedor", lastName: "Emelianenko", militaryId: "77777", rank: "O9" },
  { firstName: "Hollow", lastName: "Knight", militaryId: "88888", rank: "O10" },
]

const pendingUsers = [];

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Pilots() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [value, setValue] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState(null);
  const [users, setUsers] = useState(testUsers);

  const [approveUsers, setApproveUsers] = useState(testUsers);
  const [checkedUsers, setCheckedUsers] = useState(pendingUsers);

  useEffect(() => {
    axios.get('/approval')
      .then((response) => {
        console.log("Pilots:", response.data);
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
      let index = newUsers.findIndex((element)=> element.militaryId === user.militaryId)
      newUsers[index] = user;
      setUsers(newUsers);
    }
  };

  const handleApprove = (user = null) => {
    if (!user) return;
    let pendUsers = [...checkedUsers];
    pendUsers.push(user);
    setCheckedUsers(pendUsers);
  };

  const handleApproveAll = () => {
    console.log(checkedUsers);
  };

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
          <TabPanel value={value} index={0}>

            {edit ? 
              <EditUser 
                user={editUser}
                handleEdit={handleEdit}
              /> 
              :
              <>
                <Grid container item direction className={classes.labels}>
                  <Grid xs={2} align="start">
                    <p>First Name</p>
                  </Grid>
                  <Grid xs={2} align="start">
                    <p>Last Name</p>
                  </Grid>
                  <Grid xs={2} align="start">
                    <p>Military ID</p>
                  </Grid>
                  <Grid xs={2} align="start">
                    <p>Rank</p>
                  </Grid>
                </Grid>

                {users.map(user => (
                  <ActiveUsers
                    user={user}
                    handleEdit={handleEdit}
                  />
                ))}
              </>
            }

          </TabPanel>  
          
          {/* Users Waiting for Approval */}
          <TabPanel value={value} index={1}>

            <Grid container item direction="row" className={classes.labels}>
              <Grid xs={2} align="start">
                First Name
              </Grid>
              <Grid xs={2} align="start">
                Last Name
              </Grid>
              <Grid xs={2} align="start">
                Military ID
              </Grid>
              <Grid xs={2} align="start">
                Rank
              </Grid>
            </Grid>

            {approveUsers.map(user => (
              <PendingUsers
                user={user}
                handleApprove={handleApprove}
              />
            ))}  

            <Grid direction="row" align="right">
              <Button
                variant="contained"
                onClick={() => handleApproveAll()}
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
