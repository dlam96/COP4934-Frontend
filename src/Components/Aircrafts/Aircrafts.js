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
  Tab 
} from "@material-ui/core";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ActiveAircrafts from './ActiveAircrafts.js';
import Maitenance from './Maitenance.js';

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

const testAircrafts = [
  { aircraft: "Pave Hawk", numCrew: 4, craftId: 1},
  { aircraft: "Combat King", numCrew: 5, craftId: 2},
  { aircraft: "Thunderbolt", numCrew: 1, craftId: 3},  
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

export default function Aircrafts() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [value, setValue] = useState(0);

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
                <Tab label="Active" />
                <Tab label="Maitenance" />
            </Tabs> 
        </AppBar>

        <Paper className={fixedHeightPaper} variant="outlined">

          {/* Active Aircrafts */}
          <TabPanel value={value} index={0}>

            <Grid container item direction="row" className={classes.labels}>
              <Grid item xs={3} align="start">
                Aircraft
              </Grid>
              <Grid item xs={3} align="start">
                Crew
              </Grid>
              <Grid item xs={6} align="start" />
            </Grid>

            {testAircrafts.map(aircraft => (
                  <ActiveAircrafts
                    aircrafts={aircraft}
                    key={aircraft.craftId}
                  />
            ))} 

          </TabPanel>  
          
          {/* Maitenance */}
          <TabPanel value={value} index={1}>
            
            <Grid container item direction="row" className={classes.labels}>
              <Grid item xs={3} align="start">
                Aircraft
              </Grid>
              <Grid item xs={3} align="start">
                Crew
              </Grid>
              <Grid item xs={6} align="start" />
            </Grid>

            {testAircrafts.map(aircraft => (
                  <Maitenance
                    aircrafts={aircraft}
                    key={aircraft.craftId}
                  />
            ))} 
            
          </TabPanel>  
          
        </Paper>

        </Grid>
      </Grid>
    </Container>
  );
}
