import React, { useEffect } from "react";
import clsx from "clsx";
import axios from 'axios';
import { Container, Grid, Paper, makeStyles, AppBar, Tabs, Tab } from "@material-ui/core";

import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ActiveUsers from "./ActiveUsers";

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
    height: 500,
  },
}));

export default function Pilots() {
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  const [value, setValue] = React.useState(0);

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

            <ActiveUsers
              firstName="Kenny "
              lastName="Cheng "
              militaryId="12345 "
              rank="O2 "
            />

            <ActiveUsers
              firstName="Chenny "
              lastName="Keng "
              militaryId="6789 "
              rank="O1 "
            />

          </TabPanel>  
          <TabPanel value={value} index={1}>
            Waiting for Approval  
          </TabPanel>  
        </Paper>

        </Grid>
      </Grid>
    </Container>
  );
}
