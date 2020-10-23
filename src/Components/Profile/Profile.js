import React from "react";
import {
  Container,
  Grid,
  makeStyles,
  Avatar,
  Typography,
  AppBar,
  Tab,
  Tabs,
  Box,
} from "@material-ui/core";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import faker from "faker";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 150,
    height: 150,
  },
  firstCol: {
    padding: theme.spacing(3, 0, 0, 0),
  },
  secondCol: {
    maxHeight: "250px",
  },
  subtitle: {
    color: "grey",
    padding: theme.spacing(1, 0, 0, 0),
  },
  name: {
    padding: theme.spacing(5, 0, 0, 0),
  },
  rank: {
    padding: theme.spacing(0, 0, 1, 1),
    color: theme.palette.primary.main,
  },
  valueStyling: {
    padding: theme.spacing(0, 0, 1, 0),
  },
  container: {
    // backgroundColor: "white",
    height: "100vh",
  },
  personalInfo: {
    padding: theme.spacing(1, 0, 0, 0),
    color: theme.palette.secondary.main,
  },
  contactInfo: {
    color: "grey",
    padding: theme.spacing(3, 0, 0, 0),
    color: theme.palette.secondary.main,
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
  const [value, setValue] = React.useState(0);
  const handleIndex = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Container disableGutters={true} className={classes.container}>
      <Grid container justify="center">
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
                <Typography variant="h3" className={classes.name}>
                  {`${props.first_name}  ${props.last_name}`}
                </Typography>
                <Typography variant="subtitle1" className={classes.rank}>
                  Sergent
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* Tabs */}
        <Grid container item xs={6}>
          <AppBar position="static">
            <Tabs
              value={value}
              onChange={handleIndex}
              aria-label="simple tabs example"
              // variant="fullWidth"
            >
              <Tab label="About" {...a11yProps(0)} />
              {/* <Tab label="Item Two" {...a11yProps(1)} /> */}
              {/* <Tab label="Item Three" {...a11yProps(2)} /> */}
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <Container>
              {/* Personal info */}
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.personalInfo}>
                    Personal Information
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
                  <Typography
                    variant="subtitle1"
                    className={classes.valueStyling}
                  >
                    {props.role}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="subtitle1"
                    className={classes.valueStyling}
                  >
                    Rank
                  </Typography>
                </Grid>
                {/* Email / ??? headings*/}
                <Grid item xs={12}>
                  <Typography variant="body2" className={classes.subtitle}>
                    ????
                  </Typography>
                </Grid>
                {/* ??? / ??? values */}
                <Grid item xs={12}>
                  <Typography
                    variant="subtitle1"
                    className={classes.valueStyling}
                  >
                    ???
                  </Typography>
                </Grid>
              </Grid>
              {/* contact info */}
              <Grid item container xs={12}>
                <Grid item xs={12}>
                  <Typography variant="h6" className={classes.contactInfo}>
                    Contact Information
                  </Typography>
                </Grid>
                {/* phone/email col */}
                <Grid container item xs={6}>
                  <Grid item xs={12}>
                    <Typography variant="body2" className={classes.subtitle}>
                      Phone
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      className={classes.valueStyling}
                    >
                      {faker.phone.phoneNumber()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body2" className={classes.subtitle}>
                      Email
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      className={classes.valueStyling}
                    >
                      {props.email}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Address col */}
                <Grid container item xs={6}>
                  <Grid item xs={12}>
                    <Typography variant="body2" className={classes.subtitle}>
                      Address
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography
                      variant="subtitle1"
                      className={classes.valueStyling}
                    >
                      {`${faker.address.streetAddress()}`}
                      <br />
                      {`${faker.address.city()} ${faker.address.zipCode()}`}
                      <br />
                      United States
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Container style={{ height: 100, width: 1000 }}>
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
            </Container>
          </TabPanel>
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
