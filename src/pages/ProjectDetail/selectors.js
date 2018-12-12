import { createSelector, createSelectorsA } from 'utils/redux';
import { context } from './constants';
import { initialProjectDetailState } from './state';

const projectDataSelector = projectId => state =>
  state[context].get(projectId, initialProjectDetailState);

export const actionSelector = projectId =>
  createSelector(projectDataSelector(projectId), state => state.get('action'));

export const listIdsSelector = projectId =>
  createSelector(projectDataSelector(projectId), state => {
    return state.getIn(['lists', 'listIds']);
  });

export const listDataSelector = ({ projectId, listId }) =>
  createSelector(projectDataSelector(projectId), state =>
    state.getIn(['lists', 'data', listId])
  );

export const taskDataSelector = ({ projectId, taskId }) =>
  createSelector(projectDataSelector(projectId), state =>
    state.getIn(['tasks', 'data', taskId])
  );

export const errorSelector = projectId =>
  createSelector(projectDataSelector(projectId), state => state.get('error'));
