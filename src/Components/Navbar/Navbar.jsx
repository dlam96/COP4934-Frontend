import React from "react";
import { AppBar, Toolbar, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { logout } from "../../Redux/actions.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  },
}));

function Navbar(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <img
            src={require("./airforce.png")}
            className={classes.logo}
            alt="airforce"
          />
          <div className={classes.grow} />
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
