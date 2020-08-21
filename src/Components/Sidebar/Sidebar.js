import React from "react";
import {
  Drawer,
  Toolbar,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import {
  CalendarToday,
  Create,
  People,
  LocalAirport,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: "auto",
  },
  fixedHeight: {
    height: 240,
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();

  const routes = [
    { routeName: "Schedule", path: "/Home/Schedule", icon: "CalendarToday" },
  ];

  if (props.role === "Scheduler" || props.role === "Admin") {
    routes.push({ routeName: "Create Schedule", path: "/Home/CreateSchedule", icon: "Create" });
  } 
  if (props.role === "Admin") {
    routes.push({ routeName: "Pilots" ,path: "/Home/Pilots", icon: "People" });
    routes.push({ routeName: "Aircrafts", path: "/Home/Aircrafts", icon: "LocalAirport" });
  }

  const iconNames = {
    CalendarToday: <CalendarToday />,
    Create: <Create />,
    People: <People />,
    LocalAirport: <LocalAirport />,
  };

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {/* Padding purposes */}
      <Toolbar />
      <div className={classes.drawerContainer}>
        <List>
          {/* map json array to list */}
          {routes.map((key, index) => (
            <div key={key.routeName}>
              <ListItem
                button
                component="a"
                onClick={() => handleClick(key.path)}
              >
                <ListItemIcon>{iconNames[key.icon]}</ListItemIcon>
                <ListItemText primary={key.routeName} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

const mapStateToProps = (state) => {
  return {
    role: state.loggedReducer.role
  }
}

export default connect(
  mapStateToProps,
  null
)(Sidebar)
