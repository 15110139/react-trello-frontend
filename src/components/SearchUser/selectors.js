import { createSelector, createSelectorsA } from 'utils/redux';
import { context } from './constants';

const [
  actionSelector,
  searchUsersSelector,
  errorSelector,
  searchUserRequestSelector
] = createSelectorsA(context, ['action', 'data', 'error', 'req']);

export {
  actionSelector,
  searchUsersSelector,
  errorSelector,
  searchUserRequestSelector
};
