import { createAsyncAction } from 'utils/redux';

const {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFail
} = createAsyncAction('loadProjects', 'LOAD_PROJECTS');

export { loadProjects, loadProjectsFail, loadProjectsSuccess };
