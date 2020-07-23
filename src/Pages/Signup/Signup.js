import React, { useState } from "react";
import axios from 'axios';
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { AssignmentIndRounded } from "@material-ui/icons";
import { Container, CssBaseline, Avatar, 
         Typography, TextField, Button } from "@material-ui/core";

import { signup } from '../../Redux/actions.js';

const useStyles = makeStyles((theme) => ({
  textField: {
    marginTop: theme.spacing(2),
    width: '50ch',
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
    width: "100%"
  },
  avatar: {
    margin: theme.spacing(1),
  },
  submitButton: {
    marginTop: theme.spacing(1),
  },
}));

function Signup(props) {
  const classes = useStyles();
  let history = useHistory();
  let [firstName, setFirstname] = useState(" ");
  let [lastName, setLastname] = useState(" ");
  let [militaryId, setMilid] = useState(" ");
  let [rank, setRank] = useState(" ");
  let [email, setEmail] = useState(" ");
  let [password, setPassword] = useState(" ");
  let [confirmPass, setConfirm] = useState(" ");

  function validateSignup(e) {
    // Prevent from reloading page
    e.preventDefault();
    console.log(
      "First Name:", firstName, " Last Name:", lastName, " Military ID:", militaryId, " Rank:", rank, 
      " E-mail:", email, " Password:", password, " Confirmation:", confirmPass,
    )
    
    if (password === confirmPass) {
      // Axios
      console.log("User created waiting for approval");
      props.signupAction( { email, password } );
      history.push("/");
    } else {
      console.log("Passwords do not match")
    }

    // // Axios testing here for api implementation
    
    // // Adding a new user 
    // const newUser = {
    //   firstName: props.firstName,
    //   lastName: props.lastName,
    //   militaryId: props.militaryId,
    //   rank: props.rank,
    //   email: props.email,
    //   password: props.password,
    // }
    // axios
    //   .post(``, { newUser })
    //   .then( userInfo => {
    //     console.log(userInfo);
    //     console.log(userInfo.data);
    //   })


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
            id="firstName" name="firstName" type="text"
            margin="normal" label="First Name"
            fullWidth
            required
            onChange={(e) => setFirstname(e.target.value)}
            className={classes.textField} 
          />
          <TextField 
            id="lastName" name="lastName" type="text"
            margin="normal" label="Last Name"
            fullWidth
            required
            onChange={(e) => setLastname(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="mil_id" name="mil_id" type="text"
            margin="normal" label="Military ID"
            fullWidth
            required
            onChange={(e) => setMilid(e.target.value)}
            className={classes.textField}
          />
          <TextField 
            id="rank" name="rank" type="text"
            margin="normal" label="Rank"
            fullWidth 
            required
            onChange={(e) => setRank(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="email" name="email" type="email"
            margin="normal" label="E-Mail"
            fullWidth
            required
            onChange={(e) => setEmail(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="password" name="password" type="password"
            margin="normal" label="Password"
            fullWidth
            required
            onChange={(e) => setPassword(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="confirm" name="confirm" type="password"
            margin="normal" label="Confirm Password"
            fullWidth 
            required
            onChange={(e) => setConfirm(e.target.value)}
            className={classes.textField}
          />

          <div className={classes.submitButton}>
            <Button type="submit" variant="contained">Sign Up</Button>
          </div>

        </form>

      </div>
    </Container>
  );
}
const mapDispatchToProps = { signupAction: signup };

export default connect(null, mapDispatchToProps)(Signup);