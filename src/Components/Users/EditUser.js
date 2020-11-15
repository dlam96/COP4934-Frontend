import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper,
  makeStyles, 
  TextField,
  Button,
  Select,
} from "@material-ui/core";
import {
  Face,
  Save,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedInfo: {
    paddingTop: theme.spacing(4),

    height: 470,
    alignItems: 'center',
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
  buttons: {
    paddingTop: theme.spacing(4),
  },
  saveBt: {
    marginRight: "10px",
  },
}));

export default function EditUser(props) {
  const classes = useStyles();
  const [user, setUser] = useState(props.user);

  const rankIdSlice = ( id = null) => {
    let str = id;
    let res = str.slice(0, 8);
    return res;
  }

  return (
    <Container maxWidth="lg" className={classes.container}>
      
      {/* User pic default for fun */}
      <Paper className={classes.fixedPic} variant="outlined">
        <Face className={classes.picIcon}/>
      </Paper>

      {/* User Info */}
      <Paper className={classes.fixedInfo} variant="outlined">
        <Grid container item direction='column' spacing={2}>

          <Grid container item direction='row' style={{height: '50px'}}>
            <Grid item md={5} align='right'>
              <h3>First Name</h3>
            </Grid>
            <Grid item md={2} />
            <Grid item md={3} align='start'>
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

          <Grid container item direction='row' style={{height: '50px'}}>
            <Grid item md={5} align='right'>
              <h3>Last Name</h3>
            </Grid>
            <Grid item md={2} />
            <Grid item md={3} align='start'>
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

          <Grid container item direction='row' style={{height: '50px'}}>
            <Grid item md={5} align='right'>
              <h3>Pilot Status</h3>
            </Grid>
            <Grid item md={2} />
            <Grid item md={3} align='start'>
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

          <Grid container item direction='row' style={{height: '50px'}}>
            <Grid item md={5} align='right'>
              <h3>Rank</h3>
            </Grid>
            <Grid item md={2} />
            <Grid item md={3} align='start'>
              <h3>{ rankIdSlice(user.rank_uuid) }</h3>
            </Grid>
          </Grid>

          <Grid container item direction='row' style={{height: '50px'}}>
            <Grid item md={5} align='right'>
              <h3>Role</h3>
            </Grid>
            <Grid item md={2} />
            <Grid item md={3} align='start'>
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

          <Grid container item direction='row' style={{height: '50px'}}>
            <Grid item md={5} align='right'>
              <h3>User Status</h3>
            </Grid>
            <Grid item md={2} />
            <Grid item md={3} align='start'>
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
          
          {/* Save and Cancel buttonss */}
          <Grid container item direction="row">
            <Grid item xs={12} align="center" className={classes.buttons}>
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<Save />}
                className={classes.saveBt}
                onClick={()=>props.handleEdit(user)}
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
                  
        </Grid>
      </Paper>
    </Container>
  );

}