import React, { useState } from "react";
import { 
  Paper, 
  makeStyles, 
  Checkbox,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: '#b7b7b7',
    color: '#000000',
    margin: '3px',
  },  
}));

export default function PendingUsers(props) {
  const classes = useStyles();
  const { user } = props
  const [approvCheck, setApproveCheck] = useState(false);

  const handleCheck = (e) => {
    setApproveCheck(e.target.checked);
    props.handleApprove(user);
  }

  return(
    <Paper className={classes.paper}>
      <Grid container item direction="row">
        <Grid item xs={2} align="start">
          { user.firstName }
        </Grid>
        <Grid item xs={3} align="start">
          { user.lastName }
        </Grid>
        <Grid item xs={2} align="start">
          { user.militaryId }
        </Grid>
        <Grid item xs={2} align="start">
          { user.rank }
        </Grid>
        <Grid item xs={3} align="right">
          <Checkbox
            checked={approvCheck}
            onChange={(e) => handleCheck(e)}
            color="primary"
          />
        </Grid>
      </Grid>
    </Paper>
  )

}

