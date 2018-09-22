import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './utils/registerServiceWorker';
import { Provider } from 'react-redux';
import { store, history } from './store';
import { Switch } from 'react-router';
import { renderRoutes } from 'react-router-config';
import { ConnectedRouter } from 'connected-react-router';
import routes from './routes';

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>{renderRoutes(routes)}</Switch>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
