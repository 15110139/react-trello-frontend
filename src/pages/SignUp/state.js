import { Record } from 'immutable';
class SignUpState extends Record({
  error: null,
  action: ''
}) {}

export default new SignUpState();
