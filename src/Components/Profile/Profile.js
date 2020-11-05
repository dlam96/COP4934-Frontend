import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Avatar,
  Typography,
  AppBar,
  Tab,
  Tabs,
  Box,
  Button,
  TextField,
} from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { WebSocketFrame } from "../WebSocket/WebSocket.js";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 150,
    height: 150,
  },
  firstCol: {
    padding: theme.spacing(3, 0, 0, 0),
  },
  secondCol: {
    maxHeight: "250px",
  },
  subtitle: {
    color: "grey",
    padding: theme.spacing(1, 0, 0, 0),
  },
  name: {
    padding: theme.spacing(5, 0, 0, 0),
  },
  rank: {
    padding: theme.spacing(0, 0, 1, 1),
    color: theme.palette.primary.main,
  },
  valueStyling: {
    padding: theme.spacing(0, 0, 1, 0),
  },
  container: {
    // backgroundColor: "white",
    height: "100vh",
  },
  personalInfo: {
    padding: theme.spacing(1, 0, 0, 0),
    color: theme.palette.secondary.main,
  },
  contactInfo: {
    color: "grey",
    padding: theme.spacing(3, 0, 0, 0),
    color: theme.palette.secondary.main,
  },
}));
/*=================================================================
Tab functions
=================================================================*/
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/*=================================================================
End of Tab functions
=================================================================*/
const TOTALCOUNT = 20;

function Profile(props) {
  const classes = useStyles();
  // call mock data function (returns array)
  const [value, setValue] = useState(0);
  const [locationName, setLocationName] = useState("");
  const [trackNum, setTrackNum] = useState("");
  const [editLocationName, setEditLocationName] = useState("");
  useEffect(() => {
    console.log("Locations:", props.locations);
  }, []);
  const handleIndex = (event, newValue) => {
    setValue(newValue);
  };

  function onAddButtonClick() {
    console.log("Clicked Add button!");
    WebSocketFrame.locationHandler("add", {
      location_name: locationName,
      track_num: trackNum,
    });
  }

  function onDeleteButtonClick(location_uuid) {
    console.log("Clicked Delete button!");
    WebSocketFrame.locationHandler("delete", { location_uuid: location_uuid });
  }

  function onEditButtonClick(location) {
    console.log("Clicked Edit Button!");
    WebSocketFrame.locationHandler("edit", {
      ...location,
      location_name: editLocationName,
    });
  }

  function handleLocationChange(value) {
    setLocationName(value);
  }

  function handleTrackNumChange(value) {
    setTrackNum(value);
  }

  function handleEditChange(value) {
    setEditLocationName(value);
  }

  return <Grid container className={classes.container}></Grid>;
}

const mapStateToProps = (state) => {
  return {
    role: state.loggedReducer.role,
    email: state.loggedReducer.email,
    first_name: state.loggedReducer.first_name,
    last_name: state.loggedReducer.last_name,
    locations: state.locationReducer,
  };
};
export default connect(mapStateToProps, null)(Profile);
