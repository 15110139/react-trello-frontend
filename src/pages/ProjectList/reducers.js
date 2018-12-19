import { createReducers } from 'utils/redux';
import { context } from './constants';
import initalState, { ProjectDataState } from './state';
import {
  loadProjects,
  loadProjectsFail,
  loadProjectsSuccess,
  createProject,
  createProjectFail,
  createProjectSuccess,
  resetProject,
  deleteProject,
  deleteProjectSuccess,
  deleteProjectFail
} from './actions';
import ErrorState from 'services/models/ErrorState';
import { Map, List } from 'immutable';

const projectReducers = [
  {
    on: loadProjects,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: loadProjectsSuccess,
    reducer: (state, action) => {
      const { data } = action.payload;
      console.log(data);
      return state.merge({
        action: action.type,
        data: data.reduce((accumulator, project) => {
          const { _id } = project;
          console.log(_id);
          const immutableProject = new ProjectDataState(project);
          return accumulator.set(_id, immutableProject);
          // ? accumulator.merge(_id, immutableProject)
          // : accumulator.set(_id, immutableProject);
        }, Map()),
        projects: List(data.map(project => project._id))
      });
    }
  },
  {
    on: loadProjectsFail,
    reducer: (state, action) => {
      return state.merge({
        action: action.type,
        error: new ErrorState(action.payload)
      });
    }
  },
  {
    on: resetProject,
    reducer: state => {
      return state.merge({
        action: '',
        error: null
      });
    }
  },
  {
    on: createProject,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: createProjectSuccess,
    reducer: (state, action) => {
      const { data } = action.payload;

      return state.merge({
        action: action.type,
        data: state
          .get('data')
          .update(projectsData =>
            projectsData.set(data._id, new ProjectDataState(data))
          ),
        projects: state.get('projects').push(data._id)
      });
    }
  },
  {
    on: createProjectFail,
    reducer: (state, action) => {
      return state.merge({
        action: action.type,
        error: new ErrorState(action.payload)
      });
    }
  },
  {
    on: deleteProject,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  },
  {
    on: deleteProjectSuccess,
    reducer: (state, action) => {
      const { projectId, projectIndex } = action.payload;
      return state
        .merge({
          action: action.type
        })
        .deleteIn(['data', projectId])
        .deleteIn(['projects', projectIndex]);
    }
  },
  {
    on: deleteProjectFail,
    reducer: (state, action) => {
      return state.merge({
        action: action.type
      });
    }
  }
];

export default createReducers(context, projectReducers, initalState);
