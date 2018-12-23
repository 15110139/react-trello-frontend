import { Record, Map, List } from 'immutable';

export class SearchUserDataState extends Record({
  _id: '',
  email: '',
  username: '',
  avatarUrl: '',
  lastName: '',
  firstName: ''
}) {}

export class SearchUserRequest extends Record({
  textSearch: '',
  pageSize: 10,
  pageIndex: 0
}) {}

export class SearchUserState extends Record({
  error: null,
  action: '',
  data: List(),
  req: new SearchUserRequest()
}) {}

export default new SearchUserState();
