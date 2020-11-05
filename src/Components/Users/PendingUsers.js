import React, { useState } from 'react'
import { 
  makeStyles,
  Grid,
  Divider,
  Checkbox,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  details: {
    paddingLeft: '10px',
    marginBottom: '5px',
    alignItems: 'center',
    margin: '5px',
  }
}));

export default function PendingUsers(props) {
  const classes = useStyles();
  const { user } = props
  const [approveCheck, setApproveCheck] = useState(false);

  const rankIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 8);
    return res;
  }

  const handleCheck = (e) => {
    setApproveCheck(e.target.checked);
    props.setApproveUserList([...props.approveUserList, e.target.value]);
  }

  return( 
    <Grid container item xs={12} md={12} className={classes.details}>
      <Grid item xs={3} align="start">{ user.first_name }</Grid>
      <Grid item xs={3} align="start">{ user.last_name }</Grid>
      <Grid item xs={2} align="start">{ rankIdSlice(user.rank_uuid) }</Grid>
      <Grid item xs={1} align="start">{ user.role }</Grid>
      <Grid item xs={1} align="start">{ user.user_status }</Grid>
      <Grid item xs={2} align="right" style={{paddingRight: '15px'}}>
        <Checkbox 
          checked={approveCheck}
          value={user.account_uuid}
          color='primary'
          onChange={(e) => 
            {
              handleCheck(e)
            }
          }
        />
      </Grid>
      <Grid item xs={12} md={12}><Divider variant='middle' /></Grid>
    </Grid>
  )

}

