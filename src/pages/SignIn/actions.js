import { createAsyncAction, createAction } from 'utils/redux';
import { context } from './constants';

const { signIn, signInSuccess, signInFail } = createAsyncAction(
  context,
  'SIGN_IN'
);

const resetSignIn = createAction('RESET_SIGN_IN');

export { signIn, signInSuccess, signInFail, resetSignIn };
