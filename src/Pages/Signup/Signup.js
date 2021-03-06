import React, { useState } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { AssignmentIndRounded } from "@material-ui/icons";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
    width: "50ch",
    flexDirection: "column",
    alignItems: "center",
  },
  signupContent: {
    marginTop: theme.spacing(15),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  registration: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(1),
  },
  successful: {
    color: "green",
  },
  fail: {
    color: "red",
  },
}));

export default function Signup(props) {
  const classes = useStyles();
  let [firstName, setFirstname] = useState("");
  let [lastName, setLastname] = useState("");
  let [militaryId, setMilid] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPass, setConfirm] = useState("");
  let [successfulSignup, setSuccessfulSignup] = useState(false);
  let [failSignup, setFailSignup] = useState(false);

  function validateSignup(e) {
    // Prevent from reloading page
    e.preventDefault();
    console.log(
      "First Name:",
      firstName,
      " Last Name:",
      lastName,
      " Military ID:",
      militaryId,
      " E-mail:",
      email,
      " Password:",
      password,
      " Confirmation:",
      confirmPass
    );

    //TODO check to make sure passwords match

    if (successfulSignup) {
      setSuccessfulSignup(false);
    }
    if (failSignup) {
      setFailSignup(false);
    }
    axios
      .post("/signup", {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        military_id: militaryId,
      })
      .then((response) => {
        console.log("Response:", response);
        console.log("Response data:", response.data);
        setSuccessfulSignup(true);
      })
      .catch((error) => {
        console.log("Signup Error:", error);
        console.log(error.message);
        //TODO: if the email is already taken then tell/show that to the user to change their email to something else
        setFailSignup(true);
      });
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.signupContent}>
        <Avatar className={classes.avatar}>
          <AssignmentIndRounded />
        </Avatar>

        <Typography component="h1" variant="h3">
          Sign up
        </Typography>

        <form className={classes.registration} onSubmit={validateSignup}>
          <TextField
            id="first_name"
            name="first_name"
            type="text"
            margin="normal"
            label="First Name"
            fullWidth
            required
            onChange={(e) => setFirstname(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="last_name"
            name="last_name"
            type="text"
            margin="normal"
            label="Last Name"
            fullWidth
            required
            onChange={(e) => setLastname(e.target.value)}
            className={classes.textField}
          />
          {/* <TextField
            id="pilot_status"
            name="pilot_status"
            type="text"
            margin="normal"
            label="Pilot Status"
            fullWidth
            required
      
            className={classes.textField}
          /> */}
          <TextField
            id="email"
            name="email"
            type="email"
            margin="normal"
            label="E-Mail"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="password"
            name="password"
            type="password"
            margin="normal"
            label="Password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="confirm"
            name="confirm"
            type="password"
            margin="normal"
            label="Confirm Password"
            fullWidth
            required
            onChange={(e) => setConfirm(e.target.value)}
            className={classes.textField}
          />

          <div className={classes.submitButton}>
            <Button type="submit" variant="contained">
              Sign Up
            </Button>
          </div>

          {/* TODO: Convert these to alerts */}
          {successfulSignup ? (
            <p>Successfully Created a User Account!</p>
          ) : null}
          {failSignup ? <p>Signup failed please panic!</p> : null}
        </form>
      </div>
    </Container>
  );
}
