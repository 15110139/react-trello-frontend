import React from 'react';
import Routers from './routers';
import { history, store } from './store';
import { ConnectedRouter, push } from 'connected-react-router';
import { Provider } from 'react-redux';

class App extends React.Component {
  componentDidCatch(error, info) {
    // store.dispatch(push("/home/sign-in"));
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routers />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
