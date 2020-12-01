import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper,
  makeStyles, 
  TextField,
  Button,
  Select,
  Typography,
} from "@material-ui/core";
import {
  Face,
  Save,
} from "@material-ui/icons";
import { fade } from '@material-ui/core/styles/colorManipulator';

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  fixedPic: {
    height: 200,
    display: "flex",
    justifyContent: "center",
    paddingTop: "20px",
  },
  picIcon: {
    fontSize: "150px",
  },
  enterInfo: {
    display: 'flex',
    flexDirection: 'column',
    padding: '15px',
    width: '736px',
    height: '475px',
  },
  fields: {
    margin: '5px',
  },
  buttons: {
    paddingTop: theme.spacing(4),
  },
  saveBt: {
    marginRight: "10px",
  },
  inputRow: {
    alignItems: 'center',
    marginTop: '15px',
  },
  labelBar: {
    backgroundColor: fade(theme.palette.primary.main, 0.75),
    height: '50px',
    padding: '1px',
    marginBottom: '15px', 
    borderRadius: '5px',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function EditUser(props) {
  const classes = useStyles();
  const [user, setUser] = useState(props.user);
  const { metaPositions } = props;

  const rankIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 8);
    return res;
  }

  const removeDuplicates = Array.from(new Set(metaPositions.map(pos => pos.meta_name)))
    .map(meta_name => {
      return metaPositions.find(pos => pos.meta_name === meta_name)
    })

  return (
    <Container maxWidth="lg" className={classes.container}>
      
      {/* User pic default for fun */}
      <Paper className={classes.fixedPic} variant="outlined">
        <Face className={classes.picIcon}/>
      </Paper>

      {/* User Info */}
      <Paper className={classes.enterInfo} variant='outlined'>
      <Grid container item direction='column' style={{ justifyContent: 'center' }}>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }} >
            <Typography>
              First Name
            </Typography>
          </Grid>
          <Grid item xs={5}>
            <TextField
              name='first_name'
              label='First Name'
              size='small'
              value={ user.first_name }
              onChange={(e)=>
                {
                  let newUser = {...user}
                  newUser['first_name'] = e.target.value
                  setUser(newUser);
                }
              }
            />
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Last Name
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              name='last_name'
              label='Last Name'
              size='small'
              value={ user.last_name }
              onChange={(e)=>
                {
                  let newUser = {...user}
                  newUser['last_name'] = e.target.value
                  setUser(newUser);
                }
              }
            />
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Pilot Status
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              native
              value={user.pilot_status}
              onChange={(e)=>
                {
                  let newUser = {...user}
                  newUser['pilot_status'] = e.target.value
                  setUser(newUser)
                }
              }
            >
              <option value=''>Select</option>
              <option value='N/A'>N/A</option>
              <option value='UP'>UP</option>
              <option value='FP'>FP</option>
              <option value='MP'>MP</option>
              <option value='IP'>IP</option>
              <option value='EP'>EP</option>
            </Select>
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Rank
            </Typography>
          </Grid>
          <Grid item xs={4}>
            { rankIdSlice(user.rank_uuid) }
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Role
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <TextField
              name='role'
              label='User Role'
              size='small'
              value={ user.role }
              onChange={(e)=>
                {
                  let newUser = {...user}
                  newUser['role'] = e.target.value
                  setUser(newUser);
                }
              }
            />
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              User Status
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              native
              value={user.user_status}
              onChange={(e)=>
                {
                  let newUser = {...user}
                  newUser['user_status'] = e.target.value
                  setUser(newUser)
                }
              }
            >
              <option value=''>Select</option>
              <option value='Available'>Available</option>
              <option value='Unavailable'>Unavailable</option>
              <option value='Active_Duty_Available'>Active Duty Available</option>
              <option value='Deployed_Unavailable'>Deployed Unavailable</option>
            </Select>
          </Grid>
        </Grid>
        <Grid container item direction='row' className={classes.inputRow}>
          <Grid item xs={5} align='end' style={{ marginRight: '50px' }}>
            <Typography>
              Meta Position
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Select
              native
              name='meta_position_status'
              label='Meta Crew Position'
              value={user.meta_position_status}
              onChange={(e) =>
                {
                  let newUser = {...user}
                  newUser['meta_position_status'] = e.target.value
                  setUser(newUser);
                }
              }
            >
              <option value=''>Select</option>
              {removeDuplicates.map((pos, index) => (
                <option value={pos.meta_name} key={index}>{pos.meta_name}</option>
              ))}
            </Select>
          </Grid>
        </Grid>
      </Grid>
      
      {/* Save and Cancel buttonss */}
      <Grid container item direction="row">
        <Grid item xs={12} align="center" className={classes.buttons}>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<Save />}
            className={classes.saveBt}
            onClick={()=>props.handleEdit(user)}
            // onClick={() => {
            //   console.log(user)
            // }}
          >
            Save
          </Button>
          <Button 
            variant="contained"
            onClick={()=>props.handleEdit()}
          >
            Cancel
          </Button>
        </Grid>
      </Grid>
    </Paper>
                  
    </Container>
  );

}