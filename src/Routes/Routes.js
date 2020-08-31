import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../Pages/Login/Login.js";
import Signup from "../Pages/Signup/Signup.js";
import NotFound from "../Pages/NotFound/NotFound.js";
import Home from "../Pages/Home/Home.js";
import { connect } from "react-redux";

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
