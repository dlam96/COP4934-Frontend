import React, { useState } from "react";
import "./Login.css";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Grid,
  Link,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { LockOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../Redux/actions.js";

function Login(props) {
  let history = useHistory();
  let [authFail, setAuthFail] = useState(false);
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function validateLogin(e) {
    e.preventDefault();
    console.log("Username ", username, " password ", password);
    // Valid Credentials
    if (username === "admin@home.com" && password === "root") {
      // call the login action
      props.loginAction("admin@home.com");
      history.push("/Home");
    } else {
      setAuthFail(true);
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className="paper">
        <Avatar>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="form" onSubmit={validateLogin}>
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
            >
              Sign In
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
