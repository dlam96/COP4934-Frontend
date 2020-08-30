import React from 'react'
import { 
  Paper, 
  makeStyles,
  Button,
  IconButton,
  Grid
} from "@material-ui/core";
import {
  Delete,
} from "@material-ui/icons";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: '#b7b7b7',
    justifyContent: "center",
    color: '#000000',
    margin: '3px',
  },
  deleteBt: {
    float: 'right',
    margin: '3px',
  }, 
  editBt: {
    float: 'right',
  }, 
}));

export default function ActiveUsers(props) {
  const classes = useStyles();
  const history = useHistory();
  const { firstName, lastName, militaryId, rank } = props;
  const editRoute = { routeName: "Edit", path: "/Home/Pilots/:userId" }

  const handleClick = (path) => {
    history.push(path);
  };

  return( 
      <Paper className={classes.paper}>
        <Grid container item direction="row">
          <Grid xs={2} align="start">
            { firstName }
          </Grid>
          <Grid xs={2} align="start">
            { lastName }
          </Grid>
          <Grid xs={2} align="start">
            { militaryId }
          </Grid>
          <Grid xs={2} align="start">
            { rank }
          </Grid>
          <Grid xs={4}>
            <Button 
              variant="contained"
              size="small"
              className={classes.editBt} 
              onClick={() => handleClick(editRoute.path)}
            >
              Edit
            </Button>
          </Grid>
        </Grid>

      </Paper>

  )

}