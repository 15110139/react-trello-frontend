import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class SplashLoading extends Component {
  render() {
    return (
      <div
        className={'fullscreen'}
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', zIndex: 10 }}
      >
        <CircularProgress />
      </div>
    );
  }
}

export default SplashLoading;
