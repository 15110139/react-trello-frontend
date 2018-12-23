import { createAsyncAction, createAction } from 'utils/redux';

export const {
  searchUser,
  searchUserSuccess,
  searchUserFail
} = createAsyncAction('searchUser', 'SEARCH_USER');

export const loadNextSearchUser = createAction('LOAD_NEXT_SEARCH_USER');

export const resetSearchUser = createAction('RESET_SEARCH_USER');
