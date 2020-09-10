import React, { useState } from "react";
import { 
  Paper, 
  makeStyles, 
  Checkbox,
  Button,
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
        <Grid xs={2} align="start">
          { user.firstName }
        </Grid>
        <Grid xs={2} align="start">
          { user.lastName }
        </Grid>
        <Grid xs={2} align="start">
          { user.militaryId }
        </Grid>
        <Grid xs={2} align="start">
          { user.rank }
        </Grid>
        <Grid xs={4} align="right">
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

