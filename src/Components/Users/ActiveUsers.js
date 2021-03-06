import React from "react";
import { 
  makeStyles,
  Grid,
  Divider,
  IconButton,
  Typography,
  Tooltip
} from "@material-ui/core";
import { Edit } from "@material-ui/icons";
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

export default function ActiveUsers(props) {
  const classes = useStyles();
  const { user } = props;

  const capitalizeMetaPos = (metaName = null) => {
    let res = metaName.slice(5).replace(/_/g, ' ');
    return res.charAt(0).toUpperCase() + res.slice(1)
  }

  // const getRank = ( user = null ) => {
  //   let index = user.findIndex((element) => element.account_uuid === user.account_uuid)
  //   if (index < 0) return;
  //   return aircraftModels[index].model_name;
  // }

  return (
    <Grid container item xs={12} md={12} className={classes.details}>
      <Grid item className={classes.divBar} />
      <Grid item xs={2}>
        <Typography>
          {user.first_name}
        </Typography>
      </Grid>
      <Grid item xs={2}>
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
      <Grid item xs={2}>
        <Typography variant='body2'>
          {capitalizeMetaPos(user.meta_position_status)}
        </Typography>
      </Grid>
      <Grid item xs={1}>
        <IconButton
          className={classes.editButton}
          onClick={() => props.handleEdit(user)}
          align="right"
        >
          <Edit />
        </IconButton>
      </Grid>
    </Grid>
  );
}
