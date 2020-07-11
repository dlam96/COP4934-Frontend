import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../../Redux/actions.js";
import { IconButton, Tooltip } from "@material-ui/core";
import { Brightness4, Brightness7 } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

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
          {/* dark theme and function to toggle passed from higher level App.js */}
          <Tooltip title="Toggle dark/light theme">
            <IconButton onClick={props.action} className={classes.button}>
              {props.theme ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <div className={classes.sectionDesktop}>
            {/* Uses logged redux state to determine what to display */}
            {props.logged ? (
              <div>
                <Button
                  href="/"
                  onClick={props.logoutAction}
                  className={classes.button}
                >
                  Log Out
                </Button>
              </div>
            ) : (
              <div>
                <Button href="/" className={classes.button}>
                  Login
                </Button>
                <Button href="/Signup" className={classes.button}>
                  Signup
                </Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapDispatchToProps = { logoutAction: logout };
const mapStateToProps = (state) => {
  return {
    logged: state.logged,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
