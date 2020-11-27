import React from 'react'
import { 
  makeStyles,
  Grid,
  Divider,
  IconButton,
} from "@material-ui/core";
import {
  Edit,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  details: {
    paddingLeft: '10px',
    marginBottom: '5px',
    alignItems: 'center',
  },
  editButton: {
    color: theme.palette.secondary.main,
  },
}));

export default function ActiveUsers(props) {
  const classes = useStyles();
  const { user } = props;
  
  const rankIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 8);
    return res;
  }

  // const getRank = ( user = null ) => {
  //   let index = user.findIndex((element) => element.account_uuid === user.account_uuid)
  //   if (index < 0) return;
  //   return aircraftModels[index].model_name;
  // }

  return( 
    <Grid container item xs={12} md={12} className={classes.details}>
      <Grid item xs={3} align="start">{ user.first_name }</Grid>
      <Grid item xs={3} align="start">{ user.last_name }</Grid>
      <Grid item xs={2} align="start">{ rankIdSlice(user.rank_uuid) }</Grid>
      <Grid item xs={1} align="start">{ user.role }</Grid>
      <Grid item xs={1} align="start">{ user.user_status }</Grid>
      <Grid item xs={2} align="right" style={{paddingRight: '15px'}}>
        <IconButton 
          className={classes.editButton}
          onClick={() => props.handleEdit(user)}
          align='right'
        >
          <Edit />
        </IconButton>
      </Grid>
      <Grid item xs={12} md={12}><Divider variant='middle' /></Grid>
    </Grid>
  )

}