import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createHistory from 'history/createBrowserHistory';
import sagas from './sagas';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();

function configureStore() {
    const middlewares = [sagaMiddleware, routeMiddleware];
    const enhancers = [
        applyMiddleware(...middlewares)
    ];
    const store = createStore(connectRouter(history)(reducer), ...enhancers);
    return store;
}

const store = configureStore();

sagas.forEach(saga => {
    sagaMiddleware.run(saga);
});

export { store, history };
