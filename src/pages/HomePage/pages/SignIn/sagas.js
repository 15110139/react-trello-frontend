import { createSagas } from 'utils/redux';
import { signIn, signInSuccess, signInFail } from './actions';
import { put, call } from 'redux-saga/effects';
import { authService } from '../../services/authService';
import { push } from 'connected-react-router';
import storage from 'utils/storage';

const signInSaga = {
  on: signIn,
  worker: function*(action) {
    try {
      const res = yield call(authService.signIn, action.payload);
      console.log(res);
      yield call(storage.set, 'USER_CREDENTIAL', res.data);
      yield put(signInSuccess());
      yield put(push('/dashboard'));
    } catch (err) {
      console.log(err);
      yield put(signInFail(err));
    }
  }
};

export default createSagas([signInSaga]);
