import { Record } from 'immutable';

export default class ErrorState extends Record({
  status: '',
  error: null,
  data: null
}) {
  constructor({ status, error, data }) {
    super({ status, error, data });
  }
}
