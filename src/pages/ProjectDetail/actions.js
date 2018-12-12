import { createAsyncAction, createAction } from 'utils/redux';

const {
  loadProjectDetail,
  loadProjectDetailSuccess,
  loadProjectDetailFail
} = createAsyncAction('loadProjectDetail', 'LOAD_PROJECT_DETAIL');

const { createList, createListSuccess, createListFail } = createAsyncAction(
  'createList',
  'CREATE_LIST'
);

const { createTask, createTaskSuccess, createTaskFail } = createAsyncAction(
  'createTask',
  'CREATE_TASK'
);

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
  resetProjectDetail,
  createList,
  createListSuccess,
  createListFail,
  createTask,
  createTaskSuccess,
  createTaskFail
};
