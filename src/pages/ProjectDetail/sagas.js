import { createSagas } from 'utils/redux';
import {
  loadProjectDetail,
  loadProjectDetailSuccess,
  loadProjectDetailFail,
  moveTaskSuccess,
  moveTaskFail,
  moveTask,
  moveListSuccess,
  moveListFail,
  moveList
} from './actions';
import { put, call } from 'redux-saga/effects';
import { projectService } from 'services/projectService';

const loadProjectDetailSaga = {
  on: loadProjectDetail,
  worker: function*(action) {
    try {
      const { projectId } = action.payload;
      const res = yield call(projectService.getProjectDetail, projectId);
      console.log(res);
      const {
        data: { project, tasks, lists }
      } = res;
      yield put(loadProjectDetailSuccess({ projectId, project, tasks, lists }));
    } catch (err) {
      yield put(loadProjectDetailFail(err));
    }
  }
};

export default createSagas([loadProjectDetailSaga]);
