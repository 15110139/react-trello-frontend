import { createSagas } from 'utils/redux';
import { signIn, signInSuccess, signInFail } from './actions';
import { put, call } from 'redux-saga/effects';
import { authService } from '../../services/authService';
import { push } from 'connected-react-router';
import storage from 'utils/storage';
import moment from 'moment';

const signInSaga = {
  on: signIn,
  worker: function*(action) {
    try {
      const res = yield call(authService.signIn, action.payload);
      yield call(storage.set, 'USER_CREDENTIAL', {
        ...res.data,
        createdAt: moment()
      });
      yield put(signInSuccess());
      yield put(push('/projects'));
    } catch (err) {
      yield put(signInFail(err));
    }
  }
};

export default createSagas([signInSaga]);
