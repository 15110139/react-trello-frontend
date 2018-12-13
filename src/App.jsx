import React from 'react';
import Routers from './routers';
import { history, store } from './store';
import { ConnectedRouter, push } from 'connected-react-router';
import { Provider } from 'react-redux';
import SnackbarManager from 'components/base/SnackbarManager';
import Snackbar from './components/base/Snackbar';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.snackBar = React.createRef();
  }

  componentDidCatch(error, info) {
    // store.dispatch(push("/home/sign-in"));
  }

  componentDidMount() {
    SnackbarManager.register(this.snackBar.current);
  }

  render() {
    return (
      <Provider store={store}>
        <React.Fragment>
          <ConnectedRouter history={history}>
            <Routers />
          </ConnectedRouter>
          <Snackbar ref={this.snackBar} />
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
