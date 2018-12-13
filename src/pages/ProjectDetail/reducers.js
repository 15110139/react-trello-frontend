import { createReducers } from 'utils/redux';
import { context } from './constants';
import initalState, {
  ProjectDataState,
  initialProjectDetailState,
  TaskDataState,
  ProjectInfoDataState,
  ListDataState,
  TaskState,
  ListState
} from './state';
import {
  loadProjectDetail,
  loadProjectDetailSuccess,
  loadProjectDetailFail,
  resetProjectDetail,
  createList,
  createListFail,
  createListSuccess,
  createTask,
  createTaskSuccess,
  createTaskFail,
  moveTask,
  revertMoveTask,
  moveTaskFail,
  moveTaskSuccess,
  moveList,
  moveListSuccess,
  moveListFail
} from './actions';
import ErrorState from 'services/models/ErrorState';
import { Map, List } from 'immutable';
import { sortBy } from 'lodash';

const projectDetailReducers = [
  {
    on: loadProjectDetail,
    reducer: (state, action) => {
      const projectId = action.payload;
      return state
        .mergeIn([projectId], initialProjectDetailState)
        .mergeIn([projectId], {
          action: action.type
        });
    }
  },
  {
    on: loadProjectDetailSuccess,
    reducer: (state, action) => {
      const { project, lists, tasks, projectId } = action.payload;
      console.log(
        state
          .mergeIn([projectId], {
            action: action.type,
            info: new ProjectInfoDataState(project),
            tasks: new TaskState({
              taskIds: List(tasks.map(task => task._id)),
              data: tasks.reduce((accumulator, task) => {
                const { _id } = task;
                const immutableTask = new TaskDataState(task);
                return accumulator.get(_id)
                  ? accumulator.merge(_id, immutableTask)
                  : accumulator.set(_id, immutableTask);
              }, Map())
            }),
            lists: new ListState({
              listIds: List(lists.map(list => list._id)).sortBy(
                list => list.position
              ),
              data: lists.reduce((accumulator, list) => {
                const { _id } = list;
                list.tasks = List(
                  sortBy(
                    tasks.filter(task => task.listId === _id),
                    task => task.position
                  ).map(task => task._id)
                );
                const immutableList = new ListDataState(list);
                return accumulator.get(_id)
                  ? accumulator.merge(_id, immutableList)
                  : accumulator.set(_id, immutableList);
              }, Map())
            })
          })
          .toJS(),
        'state'
      );
      return state.mergeIn([projectId], {
        action: action.type,
        info: new ProjectInfoDataState(project),
        tasks: new TaskState({
          taskIds: List(tasks.map(task => task._id)),
          data: tasks.reduce((accumulator, task) => {
            const { _id } = task;
            const immutableTask = new TaskDataState(task);
            return accumulator.get(_id)
              ? accumulator.merge(_id, immutableTask)
              : accumulator.set(_id, immutableTask);
          }, Map())
        }),
        lists: new ListState({
          listIds: List(lists.map(list => list._id)).sortBy(
            list => list.position
          ),
          data: lists.reduce((accumulator, list) => {
            const { _id } = list;
            list.tasks = List(
              sortBy(
                tasks.filter(task => task.listId === _id),
                task => task.position
              ).map(task => task._id)
            );
            const immutableList = new ListDataState(list);
            return accumulator.get(_id)
              ? accumulator.merge(_id, immutableList)
              : accumulator.set(_id, immutableList);
          }, Map())
        })
      });
    }
  },
  {
    on: loadProjectDetailFail,
    reducer: (state, action) => {
      const { projectId } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type,
        error: new ErrorState(action.payload)
      });
    }
  },
  {
    on: resetProjectDetail,
    reducer: (state, action) => {
      const { projectId } = action.payload;
      return state.mergeIn([projectId], {
        action: '',
        error: null
      });
    }
  }
];

const listReducers = [
  {
    on: createList,
    reducer: (state, action) => {
      const { projectId } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type
      });
    }
  },
  {
    on: createListSuccess,
    reducer: (state, action) => {
      const { projectId, _id } = action.payload;
      return state
        .mergeIn([projectId], {
          action: action.type
        })
        .updateIn([projectId, 'lists', 'listIds'], listIds => listIds.push(_id))
        .setIn(
          [projectId, 'lists', 'data', _id],
          new ListDataState(action.payload)
        );
    }
  },
  {
    on: createListFail,
    reducer: (state, action) => {
      const { projectId, err } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type,
        error: new ErrorState(err)
      });
    }
  }
];

const taskReducers = [
  {
    on: createTask,
    reducer: (state, action) => {
      const { projectId } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type
      });
    }
  },
  {
    on: createTaskSuccess,
    reducer: (state, action) => {
      const { projectId, _id, listId } = action.payload;
      return state
        .mergeIn([projectId], {
          action: action.type
        })
        .updateIn([projectId, 'lists', 'data', listId, 'tasks'], taskIds =>
          taskIds.push(_id)
        )
        .setIn(
          [projectId, 'tasks', 'data', _id],
          new TaskDataState(action.payload)
        );
    }
  },
  {
    on: createTaskFail,
    reducer: (state, action) => {
      const { projectId, err } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type,
        error: new ErrorState(err)
      });
    }
  },
  {
    on: moveTask,
    reducer: (state, action) => {
      const {
        projectId,
        taskId,
        srcId,
        desId,
        srcIndex,
        desIndex
      } = action.payload;
      return state
        .mergeIn([projectId], {
          action: action.type
        })
        .updateIn([projectId, 'lists', 'data', srcId, 'tasks'], taskIds =>
          taskIds.delete(srcIndex)
        )
        .updateIn([projectId, 'lists', 'data', desId, 'tasks'], taskIds =>
          taskIds.insert(desIndex, taskId)
        );
    }
  },
  {
    on: moveTaskSuccess,
    reducer: (state, action) => {
      const { projectId } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type
      });
    }
  },
  {
    on: moveTaskFail,
    reducer: (state, action) => {
      const {
        projectId,
        taskId,
        srcId,
        desId,
        srcIndex,
        desIndex,
        err
      } = action.payload;
      return state
        .mergeIn([projectId], {
          action: action.type,
          error: new ErrorState(err)
        })
        .updateIn([projectId, 'lists', 'data', desId, 'tasks'], taskIds =>
          taskIds.delete(desIndex)
        )
        .updateIn([projectId, 'lists', 'data', srcId, 'tasks'], taskIds =>
          taskIds.insert(srcIndex, taskId)
        );
    }
  },
  {
    on: moveList,
    reducer: (state, action) => {
      const { listId, srcIndex, desIndex, projectId } = action.payload;
      return state
        .mergeIn([projectId], {
          action: action.type
        })
        .updateIn([projectId, 'lists', 'listIds'], listIds => {
          const targetId = listIds.get(desIndex);
          return listIds
            .delete(srcIndex)
            .insert(listIds.indexOf(targetId), listId);
        });
    }
  },
  {
    on: moveListSuccess,
    reducer: (state, action) => {
      const { projectId } = action.payload;
      return state.mergeIn([projectId], {
        action: action.type
      });
    }
  },
  {
    on: moveListFail,
    reducer: (state, action) => {
      const { listId, srcIndex, desIndex, projectId, err } = action.payload;
      return state
        .mergeIn([projectId], {
          action: action.type,
          error: new ErrorState(err)
        })
        .updateIn([projectId, 'lists', 'listIds'], listIds => {
          const targetId = listIds.get(srcIndex);
          return listIds
            .filter(id => id !== listId)
            .insert(listIds.indexOf(targetId), listId);
        });
    }
  }
];

export default createReducers(
  context,
  [...projectDetailReducers, ...listReducers, ...taskReducers],
  initalState
);
