import React, { useState } from "react";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
  makeStyles,
  withStyles,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LockOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../Redux/actions.js";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(20),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  hyperlinks: {
    // color: theme.palette.secondary.main,
    color: "inherit",
    textDecoration: "none",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CssTextField = withStyles((theme) => ({
  root: {
    "& label.Mui-focused": {
      color: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      // "& fieldset": {
      //   borderColor: "red",
      // },
      // "&:hover fieldset": {
      //   borderColor: "yellow",
      // },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.secondary.main,
      },
    },
  },
}))(TextField);

function Login(props) {
  const classes = useStyles();
  let history = useHistory();
  let [authFail, setAuthFail] = useState(false);
  let [acceptFail, setAcceptFail] = useState(false);
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");

  // TODO: axios
  function validateLogin(e) {
    e.preventDefault();
    if (authFail) setAuthFail(false);
    if (acceptFail) setAcceptFail(false);

    //console.log("Email", email, " Password", password);
    // Valid Credentials
    axios
      .post("/login", {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log("Token", response.data.access_token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access_token}`;
        props.loginAction({
          accountUUID: response.data.account_uuid,
          email: email,
          role: response.data.role,
          accessToken: response.data.access_token,
          accessTokenCreated: response.data.access_token_created,
          accessTokenExpiresIn: response.data.access_token_expires_in,
        });
        history.push("/Home/Schedule");
      })
      .catch((error) => {
        // console.log("Login Error:", error);
        // console.log("Error Detail:", error.response);
        if (error.response) {
          if (
            error.response.data &&
            error.response.data.error &&
            error.response.data.error.message.includes("accepted")
          ) {
            setAcceptFail(true);
          } else {
            setAuthFail(true);
          }
        } else {
          console.log("Might need to change when backend down?");
          setAuthFail(true);
        }
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form className={classes.form} onSubmit={validateLogin}>
          {authFail ? (
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setAuthFail(false)}
            >
              Incorrect email or Password
            </Alert>
          ) : null}
          {acceptFail ? (
            <Alert
              severity="error"
              variant="filled"
              onClose={() => setAuthFail(false)}
            >
              You have not been accepted yet
            </Alert>
          ) : null}
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => setEmail(e.target.value)}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="submit">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              root="true"
              className={classes.submit}
            >
              Log In
            </Button>
          </div>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" className={classes.hyperlinks}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="/Signup"
                variant="body2"
                className={classes.hyperlinks}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

const mapDispatchToProps = { loginAction: login };

export default connect(null, mapDispatchToProps)(Login);
