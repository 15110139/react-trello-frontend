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
  moveList,
  createList,
  createListSuccess,
  createListFail,
  createTask,
  createTaskSuccess,
  createTaskFail,
  deleteList,
  deleteListSuccess,
  deleteListFail,
  deleteTaskSuccess,
  deleteTaskFail,
  deleteTask
} from './actions';
import { put, call } from 'redux-saga/effects';
import { projectService } from 'services/projectService';
import { listService } from 'services/listService';
import { taskService } from 'services/taskService';
import SnackbarManager from '../../components/base/SnackbarManager';

const loadProjectDetailSaga = {
  on: loadProjectDetail,
  worker: function*(action) {
    try {
      const projectId = action.payload;
      const res = yield call(projectService.getProjectDetail, projectId);
      const {
        data: { project, tasks, lists }
      } = res;
      yield put(loadProjectDetailSuccess({ projectId, project, tasks, lists }));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      const projectId = action.payload;
      yield put(loadProjectDetailFail({ err, projectId }));
    }
  }
};

const createListSaga = {
  on: createList,
  worker: function*(action) {
    try {
      const res = yield call(listService.createList, action.payload);
      yield put(createListSuccess(res.data));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      const { projectId } = action.payload;
      yield put(createListFail({ err, projectId }));
    }
  }
};

const createTaskSaga = {
  on: createTask,
  worker: function*(action) {
    try {
      const res = yield call(taskService.createTask, action.payload);
      yield put(createTaskSuccess(res.data));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      const { projectId } = action.payload;
      yield put(createTaskFail({ err, projectId }));
    }
  }
};

const moveListSaga = {
  on: moveList,
  worker: function*(action) {
    try {
      const { listId, srcIndex, desIndex, projectId } = action.payload;
      yield call(listService.moveList, {
        listId,
        position: desIndex
      });
      yield put(moveListSuccess({ projectId }));
    } catch (err) {
      const { listId, srcIndex, desIndex, projectId } = action.payload;
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      yield put(moveListFail({ err, projectId, listId, srcIndex, desIndex }));
    }
  }
};

const moveTaskSaga = {
  on: moveTask,
  worker: function*(action) {
    try {
      const {
        projectId,
        taskId,
        srcId,
        desId,
        srcIndex,
        desIndex
      } = action.payload;
      yield call(taskService.moveTask, {
        listId: desId,
        taskId,
        position: desIndex
      });
      yield put(moveTaskSuccess({ projectId }));
    } catch (err) {
      const {
        projectId,
        taskId,
        srcId,
        desId,
        srcIndex,
        desIndex
      } = action.payload;
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      yield put(
        moveTaskFail({
          err,
          projectId,
          taskId,
          srcId,
          desId,
          srcIndex,
          desIndex
        })
      );
    }
  }
};

const deleteListSaga = {
  on: deleteList,
  worker: function*(action) {
    try {
      const { projectId, listId, listIndex } = action.payload;
      yield call(listService.deleteList, listId);
      yield put(deleteListSuccess({ projectId, listId, listIndex }));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      const { projectId } = action.payload;
      yield put(deleteListFail({ err, projectId }));
    }
  }
};

const deleteTaskSaga = {
  on: deleteTask,
  worker: function*(action) {
    try {
      const { projectId, taskId, taskIndex, listId } = action.payload;
      yield call(taskService.deleteTask, taskId);
      yield put(deleteTaskSuccess({ projectId, taskId, taskIndex, listId }));
    } catch (err) {
      SnackbarManager.show({
        message: 'Something went wrong, please try again later!'
      });
      const { projectId } = action.payload;
      yield put(deleteTaskFail({ err, projectId }));
    }
  }
};

export default createSagas([
  loadProjectDetailSaga,
  createListSaga,
  createTaskSaga,
  moveListSaga,
  moveTaskSaga,
  deleteListSaga,
  deleteTaskSaga
]);
