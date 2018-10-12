import { createSagas } from 'utils/redux';
import { loadProjects, loadProjectsFail, loadProjectsSuccess } from './actions';
import { put, call } from 'redux-saga/effects';
import { projectService } from './services/projectService';

const loadProjectsSaga = {
  on: loadProjects,
  worker: function*(action) {
    try {
      const { userId } = action.payload;
      const res = yield call(projectService.getAllProject, { userId });
      const { data } = res;
      yield put(loadProjectsSuccess({ userId, data }));
    } catch (err) {
      console.log(err);
      yield put(loadProjectsFail(err));
    }
  }
};

export default createSagas([loadProjectsSaga]);
