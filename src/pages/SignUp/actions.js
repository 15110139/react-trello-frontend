import { createAsyncAction } from 'utils/redux';
import { context } from './constants';

const { signUp, signUpSuccess, signUpFail } = createAsyncAction(
  context,
  'SIGN_UP'
);

export { signUp, signUpSuccess, signUpFail };
