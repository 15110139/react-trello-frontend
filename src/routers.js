import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createLoadableComponent } from 'utils/loadable';
import Navbar from './components/Navbar/Navbar';
import protectRoute from './components/Auth/protectRoute';

const NotFound = createLoadableComponent(import('./pages/NotFound'));
const SignIn = createLoadableComponent(import('./pages/SignIn'));
const SignUp = createLoadableComponent(import('./pages/SignUp'));
const ProjectList = createLoadableComponent(import('./pages/ProjectList'));
const ProjectDetail = createLoadableComponent(import('./pages/ProjectDetail'));

export default class Routers extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route path="/sign-in" component={SignIn} />
          <Route path="/sign-up" component={SignUp} />
          <Route exact path="/projects" component={protectRoute(ProjectList)} />
          <Route path="/projects/:projectId" component={ProjectDetail} />
          <Redirect from="/" to="/sign-in" />
          <Route path="/404" component={NotFound} />
          <Redirect to="/404" />
        </Switch>
      </React.Fragment>
    );
  }
}
