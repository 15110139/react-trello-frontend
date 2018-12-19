import { createSagas } from 'utils/redux';
import {
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
  createProject,
  createProjectFail,
  createProjectSuccess,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail
} from './actions';
import { put, call } from 'redux-saga/effects';
import { projectService } from 'services/projectService';
import SnackbarManager from '../../components/base/SnackbarManager';

const loadProjectsSaga = {
  on: loadProjects,
  worker: function*(action) {
    try {
      const res = yield call(projectService.getAllProject);
      const { data } = res;
      yield put(loadProjectsSuccess({ data }));
    } catch (err) {
      // SnackbarManager.show({
      //   message: 'Something went wrong, please try again later!'
      // });
      yield put(loadProjectsFail(err));
    }
  }
};

const createProjectsSaga = {
  on: createProject,
  worker: function*(action) {
    try {
      const { name } = action.payload;
      const res = yield call(projectService.createProject, { name });
      const { data } = res;
      yield put(createProjectSuccess({ data }));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      yield put(createProjectFail(err));
    }
  }
};

const deleteProjectsSaga = {
  on: deleteProject,
  worker: function*(action) {
    try {
      const { projectId } = action.payload;
      yield call(projectService.deleteProject, projectId);
      const { projectIndex } = action.payload;
      yield put(deleteProjectSuccess({ projectId, projectIndex }));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      yield put(deleteProjectFail(err));
    }
  }
};

export default createSagas([
  loadProjectsSaga,
  createProjectsSaga,
  deleteProjectsSaga
]);
