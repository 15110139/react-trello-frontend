import React, { Component } from 'react';
import Navbar from './components/Navbar';
import SignInContainer from './pages/SignIn';
import { Route } from 'react-router-dom';
import SignUpContainer from './pages/SignUp';
class HomePage extends Component {
  render() {
    const { match } = this.props;
    return (
      <div>
        <Navbar />
        <Route path={`${match.path}/sign-in`} component={SignInContainer} />
        <Route path={`${match.path}/sign-up`} component={SignUpContainer} />
      </div>
    );
  }
}

export default HomePage;
