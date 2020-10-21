import React, { useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Avatar,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListSubheader,
  Paper,
} from "@material-ui/core";
import { connect } from "react-redux";
// mock data
import { useUserRecords } from "./data";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 175,
    height: 175,
  },
  firstCol: {
    padding: theme.spacing(3, 0, 0, 0),
  },
  secondCol: {
    maxHeight: "250px",
  },
  subtitle: {
    color: "grey",
    padding: theme.spacing(3, 0, 0, 0),
  },
  name: {
    padding: theme.spacing(5, 0, 3, 0),
  },
  valueStyling: {
    padding: theme.spacing(1, 0, 1, 0),
  },
  listDimensions: {
    maxHeight: "90vh",
    width: "100%",
    overflow: "auto",
  },
  listAvatar: {
    border: "4px green solid",
  },
  listAvatarOffline: {
    border: "4px #708090 solid",
  },
}));

const TOTALCOUNT = 20;

function Profile(props) {
  const classes = useStyles();
  // call mock data function (returns array)
  const loadedUsers = useUserRecords(TOTALCOUNT);
  return (
    <Container disableGutters={true}>
      <Grid container>
        <Grid container item direction="row">
          <Grid
            item
            container
            xs={3}
            // alignItems="center"
            justify="center"
            className={classes.firstCol}
          >
            <Avatar className={classes.avatar}>
              {`${props.first_name.substr(0, 1)} 
							${props.last_name.substr(0, 1)}`}
            </Avatar>
          </Grid>
          <Grid item container xs={5} className={classes.secondCol}>
            {/* Name */}
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography variant="h4" className={classes.name}>
                  {`${props.first_name}  ${props.last_name}`}
                </Typography>
              </Grid>
              {/* Role / Rank headings*/}
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.subtitle}>
                  Role
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.subtitle}>
                  Rank
                </Typography>
              </Grid>
              {/* Role / Rank values */}
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.valueStyling}>
                  {props.role}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.valueStyling}>
                  Rank
                </Typography>
              </Grid>
              {/* Email / ??? headings*/}
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.subtitle}>
                  Email
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" className={classes.subtitle}>
                  ????
                </Typography>
              </Grid>
              {/* Email / ??? values */}
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.valueStyling}>
                  {props.email}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="h6" className={classes.valueStyling}>
                  ???
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item container xs={4}>
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
