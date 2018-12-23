import initialState, { SearchUserDataState, SearchUserState } from './state';
import {
  searchUser,
  searchUserSuccess,
  searchUserFail,
  resetSearchUser,
  loadNextSearchUser
} from './actions';
import ErrorState from 'services/models/ErrorState';
import { context } from './constants';
import { createReducers } from '../../utils/redux';
import { List } from 'immutable';

const searchUserReducers = [
  {
    on: searchUser,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: searchUserSuccess,
    reducer: (state, action) => {
      const { data = [] } = action.payload;
      return state.merge({
        action: action.type,
        data: List(data.map(user => new SearchUserDataState(user)))
      });
    }
  },
  {
    on: searchUserFail,
    reducer: (state, action) => {
      return state.merge({
        action: action.type,
        error: new ErrorState(action.payload)
      });
    }
  },
  {
    on: loadNextSearchUser,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: resetSearchUser,
    reducer: (state, action) => {
      return state.merge({
        action: '',
        error: null,
        data: List()
      });
    }
  }
];

export default createReducers(context, searchUserReducers, initialState);
