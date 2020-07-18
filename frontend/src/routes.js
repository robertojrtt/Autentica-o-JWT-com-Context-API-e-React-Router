import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PrivateRoute from './pages/PrivateRoute';

const Routes = () => (
  <Router >
    <Switch>
      <PrivateRoute component={Home} exact path="/" />
      <Route component={Login} exact path="/login" />
      <Route component={Register} exact path="/register" />
      <PrivateRoute component={NotFound}  />

    </Switch>
  </Router>
);

export default Routes;
