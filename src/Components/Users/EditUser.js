import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper,
  makeStyles, 
  TextField,
  Button,
  Select,
  FormControl,
  Typography,
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
            <h3>{ user.first_name }</h3>
          </Grid>
        </Grid>

        <Grid container item direction='row' style={{height: '50px'}}>
          <Grid item md={5} align='right'>
            <h3>Last Name</h3>
          </Grid>
          <Grid item md={2} />
          <Grid item md={3} align='start'>
            <h3>{ user.last_name }</h3>
          </Grid>
        </Grid>

        <Grid container item direction='row' style={{height: '50px'}}>
          <Grid item md={5} align='right'>
            <h3>Pilot Status</h3>
          </Grid>
          <Grid item md={2} />
          <Grid item md={3} align='start'>
            <h3>{ user.pilot_status }</h3>
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
            <h3>{ user.role }</h3>
          </Grid>
        </Grid>

        <Grid container item direction='row' style={{height: '50px'}}>
          <Grid item md={5} align='right'>
            <h3>User Status</h3>
          </Grid>
          <Grid item md={2} />
          <Grid item md={3} align='start'>
            <h3>{ user.user_status }</h3>
          </Grid>
        </Grid>

        {/* {fields.map((item, index) => 
          <Grid container item direction="row">
            <Grid item xs={3} />
            <Grid item xs={3} align="start">
              <h3>{item.label}</h3> 
            </Grid>

            { !(item.label === "Rank" || item.label === "User Status") ?
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  size="small"
                  value={user[item.value]}
                  onChange={(e) =>
                    {
                      let newUser = {...user};
                      newUser[item.value] = e.target.value;
                      setUser(newUser);
                    }
                  }
                />
              </Grid>
              :
              <Grid item xs={6}>
                <FormControl size='small'>
                  {(item.label === "Rank") ? 
                    <Select 
                      native
                      variant="outlined" 
                      value={user[item.value]}
                      onChange={(e) =>
                        {
                          let newUser = {...user};
                          newUser[item.value] = e.target.value;
                          setUser(newUser);    
                        }
                      }
                    >
                      <option value="">{user[item.value]}</option>
                      <option value="01">Second Lieutenant</option>
                      <option value="02">First Lieutenant</option>
                      <option value="03">Captain</option>
                      <option value="04">Major</option>
                      <option value="05">Lieutenant Colonel</option>
                      <option value="06">Colonel</option>
                      <option value="07">Brigadier General</option>
                      <option value="08">Major General</option>
                      <option value="09">Lieutenant General</option>
                      <option value="010">General</option>
                    </Select>
                    :
                    <Select 
                      native
                      variant ="outlined" 
                      value={user[item.value]}
                      onChange={(e)=>
                        {
                          let newUser = {...user};
                          newUser[item.value] = e.target.value;
                          setUser(newUser);    
                        }
                      }
                    >
                      <option value="">{user[item.value]}</option>
                      <option value="0">Unavailable</option>
                      <option value="1">Available</option>
                    </Select>
                  }

                </FormControl>
              </Grid>
            }
          </Grid>
        )} */}
        
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