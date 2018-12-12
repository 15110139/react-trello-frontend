import React, { Component } from 'react';
import { connect } from 'react-redux';
import SignIn from './SignIn';
import { signIn, resetSignIn } from './actions';
import { actionSelector, errorSelector } from './selectors';
import { toJS } from 'utils/toJS';
class SignInContainer extends Component {
  isLoading = () => signIn.is(this.props.action);

  render() {
    const { dispatchSignIn, dispatchResetSignIn, error } = this.props;
    return (
      <SignIn
        handleSignIn={dispatchSignIn}
        error={error}
        loading={this.isLoading()}
        resetSignIn={dispatchResetSignIn}
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
    dispatchSignIn: req => dispatch(signIn(req)),
    dispatchResetSignIn: () => dispatch(resetSignIn())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(toJS(SignInContainer));
