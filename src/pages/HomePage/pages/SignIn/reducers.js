import { createReducers } from 'utils/redux';
import { context } from './constants';
import initalState from './state';
import { signIn, signInSuccess, signInFail, resetSignIn } from './actions';
import ErrorState from 'services/models/ErrorState';
const signInReducers = [
  {
    on: signIn,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: signInSuccess,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: signInFail,
    reducer: (state, action) => {
      return state.merge({
        action: action.type,
        error: new ErrorState(action.payload)
      });
    }
  },
  {
    on: resetSignIn,
    reducer: (state, action) => {
      return state.merge({
        action: '',
        error: null
      });
    }
  }
];

export default createReducers(context, signInReducers, initalState);
