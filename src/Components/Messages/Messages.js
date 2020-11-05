import React from "react";
import {
  Container,
  Grid,
  makeStyles,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
// import PropTypes from "prop-types";
// mock data
import { useUserRecords } from "./data";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 175,
    height: 175,
  },
  listDimensions: {
    maxHeight: "90vh",
    width: "100%",
    overflow: "auto",
  },
  listAvatar: {
    border: "4px #32CD32 solid",
  },
  listAvatarOffline: {
    border: "4px #708090 solid",
  },
  container: {
    backgroundColor: "white",
  },
}));

const TOTALCOUNT = 20;

function Profile(props) {
  const classes = useStyles();
  // call mock data function (returns array)
  const loadedUsers = useUserRecords(TOTALCOUNT);
  return (
    <Container disableGutters={true} className={classes.container}>
      <Grid container>
        <Grid item xs={4}>
          <Paper className={classes.listDimensions}>
            <ListSubheader>Contacts</ListSubheader>
            <List>
              {loadedUsers.map((index, key) => {
                return (
                  <ListItem key={key}>
                    <ListItemAvatar>
                      <Avatar
                        alt="avatar"
                        src={index.avatar}
                        className={
                          index.isOnline
                            ? classes.listAvatar
                            : classes.listAvatarOffline
                        }
                      />
                    </ListItemAvatar>
                    <ListItemText primary={index.name} />
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    role: state.loggedReducer.role,
    email: state.loggedReducer.email,
    first_name: state.loggedReducer.first_name,
    last_name: state.loggedReducer.last_name,
  };
};
export default connect(mapStateToProps, null)(Profile);
