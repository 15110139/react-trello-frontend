import { reduce, isArray, isEmpty, flatten } from 'lodash';
import { createSelector } from 'reselect';
import { takeLatest } from 'redux-saga/effects';
import {
  createAction as ReduxCreateAction,
  handleActions as handleReduxActions
} from 'redux-actions';

function createAction(type) {
  const action = ReduxCreateAction(type);
  action.is = aType => action.toString() === aType;
  return action;
}

function createAsyncAction(action, type) {
  return {
    [action]: createAction(type),
    [`${action}Success`]: createAction(`${type}_SUCCESS`),
    [`${action}Fail`]: createAction(`${type}_FAIL`)
  };
}

function handleActions(actions, initialState) {
  return handleReduxActions(
    reduce(
      actions,
      (reducer, handler, action) => {
        reducer[action] = (state, act) =>
          handler(state.set('action', action), act);
        return reducer;
      },
      {}
    ),
    initialState
  );
}

function createReducers(stateContext, reducers, initialState) {
  return {
    [stateContext]: handleReduxActions(
      reduce(
        flatten(reducers),
        (reducer, action) => {
          reducer[action.on] = action.reducer;
          return reducer;
        },
        {}
      ),
      initialState
    )
  };
}

export function createSagas(sagas) {
  return flatten(sagas).map(saga => {
    return function*() {
      yield takeLatest(saga.on, saga.worker);
    };
  });
}

function createSelectorsA(context, keys) {
  const stateSelector = state => state[context];
  if (isEmpty(keys)) return stateSelector;
  return keys.map(key => {
    return createSelector(
      stateSelector,
      state => (isArray(key) ? state.getIn(key) : state.get(key))
    );
  });
}

function createSelectors(context, keys) {
  const stateSelector = state => state[context];
  return reduce(
    keys,
    (selectors, key) => {
      selectors[`${key}Selector`] = createSelector(
        stateSelector,
        state => state[key]
      );
      return selectors;
    },
    {}
  );
}

export {
  createAction,
  createAsyncAction,
  createSelectorsA,
  handleActions,
  createReducers,
  createSelectors,
  createSelector
};
