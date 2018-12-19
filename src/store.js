import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import sagas from './sagas';
import Reactotron from './configs/reactotron';

let createStoreFunc = createStore;

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development')
  createStoreFunc = Reactotron.createStore;

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMonitor = Reactotron.createSagaMonitor();
const sagaMiddleware =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? createSagaMiddleware({ sagaMonitor })
    : createSagaMiddleware();

function configureStore() {
  const middlewares = [sagaMiddleware, routeMiddleware];
  const enhancers = [applyMiddleware(...middlewares)];
  return createStoreFunc(connectRouter(history)(reducer), ...enhancers);
}

const store = configureStore();

sagas.forEach(saga => {
  sagaMiddleware.run(saga);
});

export const getStore = () => store;

export { store, history };
