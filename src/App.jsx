import React from 'react';
import Routers from './routers';
import { history, store } from './store';
import { ConnectedRouter, push } from 'connected-react-router';
import { Provider } from 'react-redux';
import SnackbarManager from 'components/base/SnackbarManager';
import ConfirmDialogManager from 'components/base/ConfirmDialogManager';
import Snackbar from './components/base/Snackbar';
import ConfirmDialog from './components/base/ConfirmDialog';
import SplashLoading from './components/base/SplashLoading';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this.snackBar = React.createRef();
    this.confirmDialog = null;
  }

  componentDidMount() {
    setTimeout(() => {
      SnackbarManager.register(this.snackBar.current);
      ConfirmDialogManager.register(this.confirmDialog);
      this.setState({ isReady: true });
    }, 0);
  }

  render() {
    const { isReady } = this.state;
    return (
      <Provider store={store}>
        <React.Fragment>
          <Snackbar ref={this.snackBar} />
          <ConfirmDialog onRef={ref => (this.confirmDialog = ref)} />
          {isReady ? (
            <ConnectedRouter history={history}>
              <Routers />
            </ConnectedRouter>
          ) : (
            <SplashLoading />
          )}
        </React.Fragment>
      </Provider>
    );
  }
}

export default App;
