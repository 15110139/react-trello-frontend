import React, { Component } from 'react';
import { renderRoutes } from 'react-router-config';

class App extends Component {
  render() {
    const { route } = this.props;
    return (
      <React.Fragment>
        {renderRoutes(route.routes)}
      </React.Fragment>);
  }
}

export default App;
