import { List, Record } from 'immutable';

import {
  SIGN_OUT_SUCCESS
} from '../../core/auth';

import {
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FILTER_PROJECTS,
  LOAD_PROJECTS_SUCCESS,
  UPDATE_PROJECT_SUCCESS
} from './action-types';


export const ProjectsState = new Record({
  deleted: null,
  filter: '',
  list: new List(),
  previous: null
});


export function projectsReducer(state = new ProjectsState(), { payload, type }) {
  switch (type) {
    case CREATE_PROJECT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.deleted && state.deleted.key === payload.key ?
              state.previous :
              state.list.unshift(payload)
      });

    case DELETE_PROJECT_SUCCESS:
      return state.merge({
        deleted: payload,
        previous: state.list,
        list: state.list.filter(project => project.key !== payload.key)
      });

    case FILTER_PROJECTS:
      return state.set('filter', payload.filterType || '');

    case LOAD_PROJECTS_SUCCESS:
      return state.set('list', new List(payload.reverse()));

    case UPDATE_PROJECT_SUCCESS:
      return state.merge({
        deleted: null,
        previous: null,
        list: state.list.map(project => {
          return project.key === payload.key ? payload : project;
        })
      });

    case SIGN_OUT_SUCCESS:
      return new ProjectsState();

    default:
      return state;
  }
}
