import { createAsyncAction, createAction } from 'utils/redux';

const {
  loadProjectDetail,
  loadProjectDetailSuccess,
  loadProjectDetailFail
} = createAsyncAction('loadProjectDetail', 'LOAD_PROJECT_DETAIL');

const { moveTask, moveTaskSuccess, moveTaskFail } = createAsyncAction(
  'moveTask',
  'MOVE_TASK'
);

const { moveList, moveListSuccess, moveListFail } = createAsyncAction(
  'moveList',
  'MOVE_LIST'
);

const resetProjectDetail = createAction('RESET_PROJECT_DETAIL');

export {
  loadProjectDetail,
  loadProjectDetailFail,
  loadProjectDetailSuccess,
  moveList,
  moveListFail,
  moveListSuccess,
  moveTask,
  moveTaskFail,
  moveTaskSuccess,
  resetProjectDetail
};
