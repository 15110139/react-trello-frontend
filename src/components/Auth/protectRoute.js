import React from 'react';
import storage from 'utils/storage';
import { store } from 'src/store';
import { push } from 'connected-react-router';

export default function protectRoute(Component) {
  class Wrapper extends React.Component {
    componentWillMount() {
      const { token, profile } = storage.get('USER_CREDENTIAL');
      if (!token) {
        store.dispatch(push('/sign-in'));
      }
    }

    render() {
      return <Component {...this.props} />;
    }
  }

  return Wrapper;
}
