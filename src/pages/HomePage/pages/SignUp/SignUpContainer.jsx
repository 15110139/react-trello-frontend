import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from './SignUp';


class SignUpContainer extends Component {
  render() {
    return (
      <SignUp/>
    );
  }
}
const mapStateToProps = (state) => {
  return {

  };
}

export default connect(
  mapStateToProps,
)(SignUpContainer);
