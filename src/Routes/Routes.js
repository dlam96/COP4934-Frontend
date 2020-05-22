import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "../Pages/Login/Login.js";
import Signup from "../Pages/Signup/Signup.js";
import NotFound from "../Pages/NotFound/NotFound.js";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/Signup">
        <Signup />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}
