import React from 'react';
import { toJS } from 'utils/toJS';
import { connect } from 'react-redux';
import {
  actionSelector,
  searchUsersSelector,
  errorSelector,
  searchUserRequestSelector
} from './selectors';
import { resetSearchUser, searchUser } from './actions';
import { SearchUserRequest } from './state';

export default function userSearchContainer(MyComponent) {
  class WrappedComponent extends React.Component {
    onSearch = (searchReq = {}) => {
      const { req, dispatchSearchUser } = this.props;
      dispatchSearchUser(
        new SearchUserRequest({
          ...req,
          ...searchReq
        }).toJS()
      );
    };

    isSearching = () => searchUser.is(this.props.action);

    render() {
      const { users, ...rest } = this.props;
      return (
        <MyComponent
          {...rest}
          onSearch={this.onSearch}
          users={users}
          isSearching={this.isSearching()}
        />
      );
    }
  }

  const mapStateToProps = state => {
    return {
      action: actionSelector(state),
      users: searchUsersSelector(state),
      error: errorSelector(state),
      req: searchUserRequestSelector(state)
    };
  };

  const mapDispatchToProps = dispatch => {
    return {
      dispatchSearchUser: req => dispatch(searchUser(req)),
      dispatchResetSearchUser: () => dispatch(resetSearchUser())
    };
  };

  return connect(
    mapStateToProps,
    mapDispatchToProps
  )(toJS(WrappedComponent));
}
