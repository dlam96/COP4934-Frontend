import React, { useEffect } from "react";
import {
  Container,
  Grid,
  makeStyles,
  Avatar,
  Typography,
} from "@material-ui/core";
import { connect } from "react-redux";
const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 175,
    height: 175,
  },
  firstRow: {
    padding: theme.spacing(3, 0, 0, 0),
  },
  subtitle: {
    color: "grey",
  },
  name: {
    padding: theme.spacing(3, 0, 3, 0),
  },
  valueStyling: {
    padding: theme.spacing(1, 0, 3, 0),
  },
}));

function Profile(props) {
  const classes = useStyles();
  // useEffect(() => {
  //   console.log("props", props);
  // });
  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid container item direction="row" className={classes.firstRow}>
          <Grid item xs={3}>
            <Avatar className={classes.avatar}>H</Avatar>
          </Grid>
          <Grid item container xs={6}>
            {/* Name */}
            <Grid item xs={12}>
              <Typography variant="h4" className={classes.name}>
                {props.first_name + " " + props.last_name}
              </Typography>
            </Grid>
            {/* Role / Rank headings*/}
            <Grid item container xs={12}>
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
            </Grid>
            {/* Role / Rank values */}
            <Grid item container xs={12}>
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
            </Grid>
            {/* Email / ??? headings*/}
            <Grid item container xs={12}>
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
            </Grid>
            {/* Email / ??? values */}
            <Grid item container xs={12}>
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
