import { createAsyncAction, createAction } from 'utils/redux';

export const {
  loadProjectDetail,
  loadProjectDetailSuccess,
  loadProjectDetailFail
} = createAsyncAction('loadProjectDetail', 'LOAD_PROJECT_DETAIL');

export const {
  createList,
  createListSuccess,
  createListFail
} = createAsyncAction('createList', 'CREATE_LIST');

export const {
  createTask,
  createTaskSuccess,
  createTaskFail
} = createAsyncAction('createTask', 'CREATE_TASK');

export const { moveTask, moveTaskSuccess, moveTaskFail } = createAsyncAction(
  'moveTask',
  'MOVE_TASK'
);

export const { moveList, moveListSuccess, moveListFail } = createAsyncAction(
  'moveList',
  'MOVE_LIST'
);

export const {
  deleteList,
  deleteListSuccess,
  deleteListFail
} = createAsyncAction('deleteList', 'DELETE_LIST');

export const {
  deleteTask,
  deleteTaskSuccess,
  deleteTaskFail
} = createAsyncAction('deleteTask', 'DELETE_TASK');

export const resetProjectDetail = createAction('RESET_PROJECT_DETAIL');
