import { createSagas } from 'utils/redux';
import { signUp, signUpSuccess, signUpFail } from './actions';
import { put, call } from 'redux-saga/effects';
import { authService } from '../../services/authService';
import { push } from 'connected-react-router';

const signUpSaga = {
  on: signUp,
  worker: function*(action) {
    try {
      yield call(authService.signUp, action.payload);
      yield put(signUpSuccess());
      yield put(push('/home/sign-in'));
    } catch (err) {
      yield put(signUpFail(err));
    }
  }
};

export default createSagas([signUpSaga]);
