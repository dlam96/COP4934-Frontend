import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../Pages/Login/Login.js";
import Signup from "../Pages/Signup/Signup.js";
import NotFound from "../Pages/NotFound/NotFound.js";
import Home from "../Pages/Home/Home.js";
import { connect } from "react-redux";

import User from "../Pages/User/User.js";
import Scheduler from "../Pages/Scheduler/Scheduler.js";

const PrivateRoute = ({ component: Component, auth }) => (
  <Route
    render={(props) =>
      auth === true ? (
        <Component auth={auth} {...props} />
      ) : (
        <Redirect to={{ pathname: "/" }} />
      )
    }
  />
);

function Routes(props) {
  return (
    <Switch>

      <Route exact path="/">
        <Login />
      </Route>

      <Route exact path="/Signup">
        <Signup />
      </Route>

      <PrivateRoute path="/Home/" auth={props.logged} component={Home} />
      {/* <PrivateRoute path="/Home/User/:id" auth={props.logged} component={User} />
      <PrivateRoute path="/Home/Scheduler/:d" auth={props.logged} component={Scheduler} /> */}

      <Route path="/User" component={User} />
      <Route path="/Scheduler" component={Scheduler} />

      <Route>
        <NotFound />
      </Route>

    </Switch>
  );
}

const mapStateToProps = (state) => {
  return {
    logged: state.loggedReducer.logged,
  };
};
export default connect(mapStateToProps, null)(Routes);
