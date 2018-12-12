import { createAsyncAction, createAction } from 'utils/redux';

const {
  loadProjects,
  loadProjectsSuccess,
  loadProjectsFail
} = createAsyncAction('loadProjects', 'LOAD_PROJECTS');

const {
  createProject,
  createProjectSuccess,
  createProjectFail
} = createAsyncAction('createProject', 'CREATE_PROJECT');

const {
  updateProject,
  updateProjectSuccess,
  updateProjectFail
} = createAsyncAction('updateProject', 'UPDATE_PROJECT');

const {
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail
} = createAsyncAction('deleteProject', 'DELETE_PROJECT');

const resetProject = createAction('RESET_PROJECT');

export {
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
  resetProject,
  createProject,
  createProjectSuccess,
  createProjectFail,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail,
  updateProject,
  updateProjectSuccess,
  updateProjectFail
};
