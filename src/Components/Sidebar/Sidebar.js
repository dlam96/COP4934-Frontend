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

export default function Sidebar() {
  const classes = useStyles();
  const history = useHistory();
  const routes = [
    { route: "Current Schedule", icon: "CalendarToday" },
    { route: "Create Schedule", icon: "Create" },
    { route: "Pilots", icon: "People" },
    { route: "Aircrafts", icon: "LocalAirport" },
  ];
  const iconNames = {
    CalendarToday: <CalendarToday />,
    Create: <Create />,
    People: <People />,
    LocalAirport: <LocalAirport />,
  };
  const handleClick = (key) => {
    console.log("handling click", key);
    history.push(key.replace(/\s/g, ""));
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
            <div key={key.route}>
              <ListItem
                button
                component="a"
                onClick={() => handleClick(key.route)}
              >
                <ListItemIcon>{iconNames[key.icon]}</ListItemIcon>
                <ListItemText primary={key.route} />
              </ListItem>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    </Drawer>
  );
}
