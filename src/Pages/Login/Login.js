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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login(props) {
  const classes = useStyles();
  let history = useHistory();
  let [authFail, setAuthFail] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  // TODO: axios
  function validateLogin(e) {
    e.preventDefault();
    if (authFail) setAuthFail(false);

    console.log("Email", username, " Password", password);
    // Valid Credentials
    axios
      .post("/login", {
        email: username,
        password: password,
      })
      .then((response) => {
        console.log("Token", response.data.token);
        props.loginAction(username);
        history.push("/Home/CurrentSchedule");
      })
      .catch((error) => {
        console.log("Login Error:", error);
        setAuthFail(true);
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
              Incorrect Username or Password
            </Alert>
          ) : null}
          <TextField
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
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
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
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/Signup" variant="body2">
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
