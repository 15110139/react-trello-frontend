import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config'
import Navbar from './components/Navbar';

class HomePage extends Component {
  render() {
    const { route } = this.props;
    return (
      <div>
        <Navbar/>
        {renderRoutes(route.routes)}
      </div>
    );
  }
}

export default HomePage;
