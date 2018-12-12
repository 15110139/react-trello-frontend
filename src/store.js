import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import sagas from './sagas';
import Reactotron from './configs/reactotron';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

function configureStore() {
  const middlewares = [sagaMiddleware, routeMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  return Reactotron.createStore(connectRouter(history)(reducer), ...enhancers);
}

const store = configureStore();

sagas.forEach(saga => {
  sagaMiddleware.run(saga);
});

export const getStore = () => store;

export { store, history };
