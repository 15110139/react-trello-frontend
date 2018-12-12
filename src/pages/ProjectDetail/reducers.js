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
  resetProjectDetail
} from './actions';
import ErrorState from 'services/models/ErrorState';
import { Map, List } from 'immutable';
import { sortBy } from 'lodash';

const projectDetailReducers = [
  {
    on: loadProjectDetail,
    reducer: (state, action) => {
      const { projectId } = action.payload;
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
            list.tasks = sortBy(
              tasks.filter(task => task.listId === _id),
              task => task.position
            ).map(task => task._id);
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
      return state.mergeIn([projectId], initialProjectDetailState);
    }
  }
];

export default createReducers(context, projectDetailReducers, initalState);
