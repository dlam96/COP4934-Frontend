import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { logout, onDarkMode, offDarkMode } from "../../Redux/actions.js";
import { IconButton, Tooltip } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';

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
    color: "white",
    "&:focus": {
      outline: "none",
    },
  },
}));

function Navbar(props) {
  const classes = useStyles();

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
                <Link to={'/'}>
                <Button
                  onClick={props.logoutAction}
                  className={classes.button}
                >
                  Log Out
                </Button>
                </Link>
              </div>
            ) : (
              <div>
                <Link to={'/'}>
                  <Button className={classes.button}>
                    Login
                  </Button>
                </Link>
                <Link to={'/signup'}>
                  <Button className={classes.button}>
                    Signup
                  </Button>
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
