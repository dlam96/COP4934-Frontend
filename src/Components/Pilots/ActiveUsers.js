import React from 'react'
import { Paper, makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: '#b7b7b7',
    padding: '5px 20px 5px 30px ',
    color: '#000000',
    margin: '5px',
  },
}));

export default function ActiveUsers(props) {
  const classes = useStyles();
  const history = useHistory();
  const { firstName, lastName, militaryId, rank } = props;
  const editRoute = { routeName: "Edit", path: "/Home/Pilots/:userId" }

  const handleClick = (path) => {
    history.push(path);
  };

  return( 
      <Paper className={classes.paper}>
          <p>
            { firstName }
            { lastName }
            { militaryId }
            { rank }
            <button style={deleteStyle}>Delete</button>
            <button onClick={() => handleClick(editRoute.path)} style={editStyle}>Edit</button>
          </p>
      </Paper>

  )

}

const editStyle = {
  float: 'right',
  margin: '5px',
}
const deleteStyle = {
  float: 'right',
  margin: '5px',
}