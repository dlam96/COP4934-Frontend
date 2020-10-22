import React from "react";
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
  AppBar,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
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
    border: "4px #32CD32 solid",
  },
  listAvatarOffline: {
    border: "4px #708090 solid",
  },
  container: {
    backgroundColor: "white",
  },
}));
/*=================================================================
Tab functions
=================================================================*/
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
/*=================================================================
End of Tab functions
=================================================================*/
const TOTALCOUNT = 20;

function Profile(props) {
  const classes = useStyles();
  // call mock data function (returns array)
  const loadedUsers = useUserRecords(TOTALCOUNT);
  const [value, setValue] = React.useState(0);
  const handleIndex = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container disableGutters={true} className={classes.container}>
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
            {/* Tabs */}
            <Grid item container xs={12}>
              <AppBar position="static">
                <Tabs
                  value={value}
                  onChange={handleIndex}
                  aria-label="simple tabs example"
                >
                  <Tab label="Item One" {...a11yProps(0)} />
                  <Tab label="Item Two" {...a11yProps(1)} />
                  <Tab label="Item Three" {...a11yProps(2)} />
                </Tabs>
              </AppBar>
              <TabPanel value={value} index={0}>
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
              </TabPanel>
              <TabPanel value={value} index={1}>
                Item Two
              </TabPanel>
              <TabPanel value={value} index={2}>
                Item Three
              </TabPanel>
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
