import React, { useState } from 'react';
import { 
  Container, 
  Grid, 
  Paper,
  makeStyles, 
  TextField,
  Button,
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
    {label: "Military ID", value: "militaryId"}
  ];
  const [user, setUser] = useState(props.user);

  // console.log("editUser:", user);

  // useEffect(()=>{
  //   setUser(props.user);
  // }, [props.user]) 

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
            <Grid xs={3} />
            <Grid xs={3} align="start">
              <h2>{item.label}</h2> 
            </Grid>
            <Grid xs={6}>
              <TextField
                variant="outlined"
                size="small"
                value={user[item.value]}
                onChange={(e)=>
                  {
                    let newUser = {...user};
                    newUser[item.value] = e.target.value;
                    setUser(newUser);
                  }
                }
              />
            </Grid>
          </Grid>
        )}
        
        {/* Save and Cancel buttonss */}
        <Grid container item direction="row">
          <Grid xs={12} align="center" className={classes.buttons}>
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