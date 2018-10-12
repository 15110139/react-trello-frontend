import { createReducers } from 'utils/redux';
import { context } from './constants';
import initalState from './state';
import { signUp, signUpSuccess, signUpFail } from './actions';
import ErrorState from 'services/models/ErrorState';

const signUpReducers = [
  {
    on: signUp,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: signUpSuccess,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: signUpFail,
    reducer: (state, action) => {
      return state.merge({
        action: action.type,
        error: new ErrorState(action.payload)
      });
    }
  }
];

export default createReducers(context, signUpReducers, initalState);
