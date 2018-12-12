import { createSelector, createSelectorsA } from 'utils/redux';
import { context } from './constants';

const [
  actionSelector,
  projectsDataSelector,
  projectsSelector,
  errorSelector
] = createSelectorsA(context, ['action', 'data', 'projects', 'error']);

const projectDataSelector = projectId =>
  createSelector(projectsDataSelector, projectsData =>
    projectsData.get(projectId)
  );

export {
  actionSelector,
  projectDataSelector,
  projectsDataSelector,
  projectsSelector,
  errorSelector
};
