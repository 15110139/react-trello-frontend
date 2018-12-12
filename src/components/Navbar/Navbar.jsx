import React, { Component } from 'react';
import HomeNavbar from 'components/Navbar/HomeNavbar';
import DashboardNavbar from 'components/Navbar/DashboardNavbar';
import { withRouter } from 'react-router';
import { get, includes } from 'lodash';

class Navbar extends Component {
  render() {
    const path = get(this.props, 'location.pathname', '').substring(1);
    if (path === 'sign-in' || path === 'sign-up') return <HomeNavbar />;
    if (includes(path, 'projects')) return <DashboardNavbar />;

    return null;
  }
}

export default withRouter(Navbar);
