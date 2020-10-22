import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper,
  makeStyles, 
  TextField,
  Button,
  Select,
  InputLabel,
  FormControl,
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
    height: 500,
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    paddingTop: "50px",
    padding: theme.spacing(2),
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
  const fields = [
    {label: "First Name", value: "firstName"}, 
    {label: "Last Name", value: "lastName"}, 
    {label: "Rank", value: "rank"},
    {label: "Pilot Status", value: "pStatus"},
    {label: "Role", value: "role"},
    {label: "User Status", value: "uStatus"},
  ];

  const [user, setUser] = useState(props.user);
  
  return (
    <Container maxWidth="lg" className={classes.container}>
      {/* User pic default for fun */}
      <Paper className={classes.fixedPic} variant="outlined">
        <Face className={classes.picIcon}/>
      </Paper>

      {/* User information */}
      <Paper className={classes.fixedInfo} variant="outlined">

        {fields.map((item, index) => 
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
        )}
        
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
      </Paper>
    </Container>
  );

}