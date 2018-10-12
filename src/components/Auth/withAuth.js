import React from 'react';
import storage from 'utils/storage';
import { store } from 'src/store';
import { push } from 'connected-react-router';
import authService from 'pages/HomePage/services/authService';

export default function withAuth(Component) {
  class Wrapper extends React.Component {
    async componentWillMount() {
      const {
        token,
        profile: { _id }
      } = storage.get('USER_CREDENTIAL');
      const isValid = await authService.verifyToken({ token, _id });
      if (!isValid) {
        store.dispatch(push('/sign-in'));
      }
    }

    render() {
      return <Component />;
    }
  }

  return Wrapper;
}
