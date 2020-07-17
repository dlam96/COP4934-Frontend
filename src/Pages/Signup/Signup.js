import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { AssignmentIndRounded } from "@material-ui/icons";
import {
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  Modal,
} from "@material-ui/core";

// const ranks = [
//   {
//     rank: 'O1',
//     label: 'Second Lieutenant',
//   },
//   {
//     rank: 'O2',
//     label: 'First Lieutenant',
//   },
//   {
//     rank: 'O3',
//     label: 'Captain',
//   },
//   {
//     rank: 'O4',
//     label: 'Major',
//   },
//   {
//     rank: 'O5',
//     label: 'Lieutenant Colonel',
//   },
//   {
//     rank: 'O6',
//     label: 'Colonel',
//   },
//   {
//     rank: 'O7',
//     label: 'Brigadier General',
//   },
//   {
//     rank: 'O8',
//     label: 'Major General',
//   },
//   {
//     rank: 'O9',
//     label: 'Lieutenant General',
//   },
//   {
//     rank: 'O10',
//     label: 'Chief of Staff',
//   },
// ]

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
  signupModal: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Signup() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let [firstName, setFirstname] = useState("");
  let [lastName, setLastname] = useState("");
  let [militaryId, setMilid] = useState("");
  let [rank, setRank] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPass, setConfirm] = useState("");
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const body = (
    <div className={classes.signupModal}>
      <p id="simple-modal-description">
        User created waiting for approval
      </p>
    </div>
  );

  function validateSignup(e) {
    e.preventDefault();
    console.log(
      "First Name ", firstName,
      "Last Name ", lastName,
      "Military ID ", militaryId,
      "Rank ", rank,
      "E-mail ", email,
      "Password ", password,
      "Confirmation ", confirmPass,
    )
      
    if (password !== confirmPass) {
      // TextField error
    } else {
      console.log('User created waiting for approval')
      // <Modal>
      // </Modal>
    }

  }

  return (
    <Container component="signupMain" maxWidth="xs">
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
            id="firstName"
            name="firstName"
            type="text"
            margin="normal"
            label="First Name"
            fullWidth
            required
            onChange={(e) => setFirstname(e.target.value)}
            className={classes.textField} 
          />
          <TextField 
            id="lastName"
            name="lastName"
            type="text"
            margin="normal"
            label="Last Name"
            fullWidth
            required
            onChange={(e) => setLastname(e.target.value)}
            className={classes.textField}
          />
          <TextField
            id="mil_id"
            name="mil_id" 
            type="text"
            margin="normal"
            label="Military ID"
            fullWidth
            required
            onChange={(e) => setMilid(e.target.value)}
            className={classes.textField}
          />
          <TextField 
            id="rank" name="rank" type="text" margin="normal"
            label="Rank" fullWidth required
            onChange={(e) => setRank(e.target.value)}
            className={classes.textField}
            // id="rank-select"
            // name="rank"
            // label="Select"
            // helperText="Rank"
            // select
          />
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
            <Button type="submit" variant="contained">Sign Up</Button>
          </div>

        </form>

      </div>
    </Container>
  );
}

export default Signup;
