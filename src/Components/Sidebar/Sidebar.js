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
  Message,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";

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
  active: {
    backgroundColor: "#D2AF39 !important",
    // color: "red",
  },
}));

function Sidebar(props) {
  const classes = useStyles();
  const history = useHistory();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [reloaded, setReloaded] = React.useState(false);

  const routes = [
    { routeName: "Schedule", path: "/Home/Schedule", icon: "CalendarToday" },
  ];

  if (props.role === "Scheduler" || props.role === "Admin") {
    routes.push({
      routeName: "Create Schedule",
      path: "/Home/CreateSchedule",
      icon: "Create",
    });
  }
  if (props.role === "Admin") {
    routes.push({ routeName: "Users", path: "/Home/Users", icon: "People" });
    routes.push({
      routeName: "Aircrafts",
      path: "/Home/Aircrafts",
      icon: "LocalAirport",
    });
    // routes.push({
    //   routeName: "Messages",
    //   path: "/Home/Messages",
    //   icon: "Message",
    // });
  }

  const iconNames = {
    CalendarToday: <CalendarToday />,
    Create: <Create />,
    People: <People />,
    LocalAirport: <LocalAirport />,
    Message: <Message />,
  };

  const handleClick = (path, index) => {
    console.log("click index", index);
    setSelectedIndex(index);
    history.push(path);
  };

  const location = useLocation();
  React.useEffect(() => {
    if (reloaded) return;
    console.log("current selectIndex", selectedIndex);
    for (let index in routes) {
      if (routes[index].path === location.pathname) {
        console.log("currently in", location.pathname, "index", index);
        setSelectedIndex(Number(index));
      }
    }
  }, [selectedIndex, reloaded]);

  React.useEffect(() => {
    setReloaded(true);
  }, []);

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
                selected={index === selectedIndex}
                onClick={() => handleClick(key.path, index)}
                classes={{ selected: classes.active }}
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
    role: state.loggedReducer.role,
  };
};

export default connect(mapStateToProps, null)(Sidebar);
