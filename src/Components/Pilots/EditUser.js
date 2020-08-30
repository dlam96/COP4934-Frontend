import React, { Component } from 'react';
import { useHistory } from "react-router-dom";
import { 
  Container, 
  Grid, 
  Paper,
  makeStyles, 
  TextField,
  Button,
} from "@material-ui/core";
import {
  Face,
  Save,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedInfo: {
    height: 525,
    padding: theme.spacing(2),
    paddingTop: "50px",
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedPic: {
    display: "flex",
    height: 300,
    justifyContent: "center",
    paddingTop: "75px",
  },
  picIcon: {
    fontSize: "150px",
  },
  saveBt: {
    margin: "5px",
  }, 
  cancelBt: {
    margin: '5px',
  }, 
}));

export default function EditUser() {
  const classes = useStyles();
  let history = useHistory();

  return (
    <Container maxWidth="lg" className={classes.container}>
      <Grid item spacing={3} xs={12} md={8} lg={9}>

        <Paper className={classes.fixedPic} variant="outlined">
          <Face className={classes.picIcon}/>
        </Paper>
  
        <Paper className={classes.fixedInfo} variant="outlined">

          <Grid container item direction="row">
            <Grid xs={6} align="center">
              <h2>First Name</h2> 
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container item direction="row">
            <Grid xs={6} align="center">
              <h2>Last Name</h2> 
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>

          <Grid container item direction="row">
            <Grid xs={6} align="center">
              <h2>E-Mail</h2> 
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          
          <Grid container item direction="row">
            <Grid xs={6} align="center">
              <h2>Occupation</h2> 
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          
          <Grid container item direction="row">
            <Grid xs={6} align="center">
              <h2>Rank</h2>
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          
          <Grid container item direction="row">
            <Grid xs={6} align="center">
              <h2>Military ID</h2>
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
              />
            </Grid>
          </Grid>
          
          <Grid container item direction="row">
            <Grid xs={12} align="center">
              <Button 
                className={classes.saveBt} 
                variant="contained" 
                color="primary"
                startIcon={<Save />}
              >
                Save
              </Button>
              <Button 
                className={classes.cancelBt} 
                variant="contained"
                onClick={()=>history.goBack()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>

        </Paper>
      

      </Grid>
    </Container>
  );

}