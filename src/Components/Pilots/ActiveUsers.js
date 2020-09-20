import React from 'react'
import { 
  Paper, 
  makeStyles,
  Button,
  Grid
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    background: '#b7b7b7',
    color: '#000000',
    margin: '3px',
  },
}));

export default function ActiveUsers(props) {
  const classes = useStyles();
  const { user } = props;

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
          <Button 
            variant="contained"
            size="small" 
            onClick={() => props.handleEdit(user)}
          >
            Edit
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )

}