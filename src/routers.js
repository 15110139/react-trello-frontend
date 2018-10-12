import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';

export default class Routers extends Component {
  render() {
    return (
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/404" component={NotFound} />
        <Redirect exact from="/" to="/home" />
        <Redirect to="/404" />
      </Switch>
    );
  }
}
