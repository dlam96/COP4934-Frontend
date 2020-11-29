import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { connect } from "react-redux";
import { logout, onDarkMode, offDarkMode } from "../../Redux/actions.js";
import {
  Brightness4,
  Brightness7,
  AccountCircle,
  ExitToApp,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { WebSocketFrame } from "../WebSocket/WebSocket.js";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  logo: {
    width: "50px",
    height: "50px",
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  button: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
    "&:focus": {
      outline: "none",
    },
  },
  menu: {
    width: "200px",
    minWidth: "100px",
  },
  link: {
    color: "inherit",
    textDecoration: "none",
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const [anchorNav, setAnchorNav] = React.useState(null);

  const handleClick = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorNav(null);
  };

  const handleLogout = () => {
    WebSocketFrame.closeWebsocket();
    props.logoutAction();
    handleClose();
  };

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <img
            src={require("./airforce.png")}
            className={classes.logo}
            alt="airforce"
          />
          <div className={classes.grow} />
          {/* dark theme and function to toggle passed from redux state */}
          <Tooltip title="Toggle dark/light theme">
            <IconButton
              onClick={!props.darkState ? props.onDMAction : props.offDMAction}
              className={classes.button}
            >
              {props.darkState ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <div className={classes.sectionDesktop}>
            {/* Uses logged redux state to determine what to display */}
            {props.logged ? (
              <div>
                <IconButton onClick={handleClick} className={classes.button}>
                  <AccountCircle />
                </IconButton>
                <Menu
                  anchorEl={anchorNav}
                  keepMounted
                  open={Boolean(anchorNav)}
                  onClose={handleClose}
                >
                  <Link to={"/Home/Profile"} className={classes.link}>
                    <MenuItem className={classes.menu}>
                      <ListItemIcon
                        style={{ minWidth: "35px" }}
                        className={classes.button}
                      >
                        <AccountCircle />
                      </ListItemIcon>
                      <ListItemText primary="Profile" />
                    </MenuItem>
                  </Link>
                  <Divider style={{ margin: "5px 0 5px 0" }} />
                  <Link to={"/"} className={classes.link}>
                    <MenuItem onClick={handleLogout} className={classes.menu}>
                      <ListItemIcon
                        style={{ minWidth: "35px" }}
                        className={classes.button}
                      >
                        <ExitToApp />
                      </ListItemIcon>
                      <ListItemText primary="Logout" />
                    </MenuItem>
                  </Link>
                </Menu>
              </div>
            ) : (
              <div>
                <Link to={"/"}>
                  <Button className={classes.button}>Login</Button>
                </Link>
                <Link to={"/Signup"}>
                  <Button className={classes.button}>Signup</Button>
                </Link>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = {
  logoutAction: logout,
  onDMAction: onDarkMode,
  offDMAction: offDarkMode,
};
const mapStateToProps = (state) => {
  return {
    logged: state.loggedReducer.logged,
    darkState: state.darkModeReducer.darkmode,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
