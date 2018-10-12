import { Record } from 'immutable';

export default class ErrorState extends Record({
  status: '',
  error: null,
  data: null
}) {}
