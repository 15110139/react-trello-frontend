import { Record } from 'immutable';
class SignInState extends Record({
  error: null,
  action: ''
}) {}

export default new SignInState();
