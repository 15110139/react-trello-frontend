import { createSagas } from 'utils/redux';
import {
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
  createProject,
  createProjectFail,
  createProjectSuccess
} from './actions';
import { put, call } from 'redux-saga/effects';
import { projectService } from 'services/projectService';

const loadProjectsSaga = {
  on: loadProjects,
  worker: function*(action) {
    try {
      const res = yield call(projectService.getAllProject);
      const { data } = res;
      yield put(loadProjectsSuccess({ data }));
    } catch (err) {
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
      console.log(res);
      const { data } = res;
      yield put(createProjectSuccess({ data }));
    } catch (err) {
      yield put(createProjectFail(err));
    }
  }
};

export default createSagas([loadProjectsSaga, createProjectsSaga]);
