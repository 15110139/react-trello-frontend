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
import WebFont from 'webfontloader';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
    this.snackBar = React.createRef();
    this.confirmDialog = null;
  }

  async componentDidMount() {
    await this.initFont();
    setTimeout(() => {
      SnackbarManager.register(this.snackBar.current);
      ConfirmDialogManager.register(this.confirmDialog);
      this.setState({ isReady: true });
    }, 0);
  }

  initFont = async () => {
    await WebFont.load({
      google: {
        families: ['Roboto:300,400,500', 'Material+Icons']
      }
    });
  };

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
