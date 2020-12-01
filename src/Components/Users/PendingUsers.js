import React, { useState } from 'react'
import { 
  makeStyles,
  Grid,
  Divider,
  Checkbox,
  Typography,
} from "@material-ui/core";
import { blueGrey } from '@material-ui/core/colors';
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  details: {
    height: '40px',
    margin: '10px',
    alignItems: 'center',
    alignContent: 'center',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: fade(blueGrey[700], 0.25),
      '& $divBar': {
        backgroundColor: theme.palette.secondary.main,
      }
    }
  },
  divBar: {
    width: '5px',
    height: '100%',
    marginRight: '55px',
    backgroundColor: 'white',
    borderRadius: '5px',
  },
  editButton: {
    color: theme.palette.secondary.main,
  },
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

  return (
    <Grid container item xs={12} md={12} className={classes.details}>
      <Grid item className={classes.divBar} />
      <Grid item xs={3}>
        <Typography>
          {user.first_name}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>
          {user.last_name}
        </Typography>
      </Grid>
      {/* <Grid item xs={2} style={{ marginLeft: '5px' }}>
        {rankIdSlice(user.rank_uuid)}
      </Grid> */}
      <Grid item xs={2}>
        <Typography variant='body2'>
          {user.role}
        </Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography variant='body2'>
          {user.user_status}
        </Typography>
      </Grid>
      <Grid item xs={1} align="right">
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
    </Grid>
  );
}

