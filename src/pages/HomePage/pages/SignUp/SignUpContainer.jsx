import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignUp from './SignUp';
import { signUp } from './actions';
import { actionSelector, errorSelector } from './selectors';
import { toJS } from 'utils/toJS';
class SignInContainer extends Component {
  isLoading = () => signUp.is(this.props.action);

  render() {
    const { dispatchSignUp, error } = this.props;
    return (
      <SignUp
        handleSignIn={dispatchSignUp}
        loading={this.isLoading()}
        error={error}
      />
    );
  }
}
const mapStateToProps = state => {
  return {
    error: errorSelector(state),
    action: actionSelector(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchSignUp: req => dispatch(signUp(req))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SignInContainer));
