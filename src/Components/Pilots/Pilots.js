import React, { useEffect } from "react";
import clsx from "clsx";
import axios from 'axios';
import { 
  Container,
  Grid, 
  Paper, 
  makeStyles, 
  AppBar, 
  Tabs, 
  Tab 
} from "@material-ui/core";

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ActiveUsers from "./ActiveUsers";
import PendingUsers from "./PendingUsers";

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

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.any.isRequired,
//   value: PropTypes.any.isRequired,
// };

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

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

export default function Pilots() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [value, setValue] = React.useState(0);

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

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8} lg={9}>

        <AppBar position="static">
            <Tabs value={value} onChange={handleChange}>
                <Tab label="Users" {...a11yProps(0)}/>
                <Tab label="New Users Approval" {...a11yProps(1)}/>
            </Tabs> 
        </AppBar>

        <Paper className={fixedHeightPaper} variant="outlined">

          <TabPanel value={value} index={0}>

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
              <Grid xs={4} />
            </Grid>

            {testUsers.map(user => (
              <ActiveUsers
                firstName={user.firstName}
                lastName={user.lastName}
                militaryId={user.militaryId}
                rank={user.rank}
              />
            ))}
          </TabPanel>  

          <TabPanel value={value} index={1}>
          {testUsers.map(user => (
              <PendingUsers
                firstName={user.firstName}
                lastName={user.lastName}
                militaryId={user.militaryId}
                rank={user.rank}
              />
            ))}  
          </TabPanel>  
          
        </Paper>

        </Grid>
      </Grid>
    </Container>
  );
}
