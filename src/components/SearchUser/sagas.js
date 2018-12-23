import { searchUser, searchUserSuccess, searchUserFail } from './actions';
import { call, put } from 'redux-saga/effects';
import { searchService } from 'services/searchService';
import { createSagas } from '../../utils/redux';

const searchUserSagas = [
  {
    on: searchUser,
    worker: function*(action) {
      try {
        const res = yield call(searchService.searchUser, action.payload);
        const { data = [] } = res;
        yield put(searchUserSuccess({ data }));
      } catch (err) {
        yield put(searchUserFail(err));
      }
    }
  }
];

export default createSagas([...searchUserSagas]);
