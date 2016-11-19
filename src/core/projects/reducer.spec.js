import { List } from 'immutable';
import { SIGN_OUT_SUCCESS } from 'src/core/auth';

import {
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_SUCCESS,
  FILTER_PROJECTS,
  LOAD_PROJECTS_SUCCESS,
  UPDATE_PROJECT_SUCCESS
} from './action-types';

import { Project } from './project';
import { projectsReducer, ProjectsState } from './reducer';


describe('projects', () => {
  describe('projectsReducer', () => {
    let project1;
    let project2;

    beforeEach(() => {
      project1 = new Project({completed: false, key: '0', title: 'project 1'});
      project2 = new Project({completed: false, key: '1', title: 'project 2'});
    });


    describe('CREATE_PROJECT_SUCCESS', () => {
      it('should prepend new project to list', () => {
        let state = new ProjectsState({list: new List([project1])});

        let nextState = projectsReducer(state, {
          type: CREATE_PROJECT_SUCCESS,
          payload: project2
        });

        expect(nextState.list.get(0)).toBe(project2);
        expect(nextState.list.get(1)).toBe(project1);
      });
    });


    describe('DELETE_PROJECT_SUCCESS', () => {
      it('should remove project from list', () => {
        let state = new ProjectsState({list: new List([project1, project2])});

        let nextState = projectsReducer(state, {
          type: DELETE_PROJECT_SUCCESS,
          payload: project2
        });

        expect(nextState.deleted).toBe(project2);
        expect(nextState.list.size).toBe(1);
        expect(nextState.list.get(0)).toBe(project1);
        expect(nextState.previous).toBe(state.list);
      });
    });


    describe('FILTER_PROJECTS', () => {
      it('should set filter with provided value', () => {
        let state = new ProjectsState();

        let nextState = projectsReducer(state, {
          type: FILTER_PROJECTS,
          payload: {
            filterType: 'completed'
          }
        });

        expect(nextState.filter).toBe('completed');
      });
    });


    describe('LOAD_PROJECTS_SUCCESS', () => {
      it('should set project list', () => {
        let state = new ProjectsState();

        let nextState = projectsReducer(state, {
          type: LOAD_PROJECTS_SUCCESS,
          payload: [project1, project2]
        });

        expect(nextState.list.size).toBe(2);
      });

      it('should order projects newest first', () => {
        let state = new ProjectsState();

        let nextState = projectsReducer(state, {
          type: LOAD_PROJECTS_SUCCESS,
          payload: [project1, project2]
        });

        expect(nextState.list.get(0)).toBe(project2);
        expect(nextState.list.get(1)).toBe(project1);
      });
    });


    describe('UPDATE_PROJECT_SUCCESS', () => {
      it('should update project', () => {
        let state = new ProjectsState({list: new List([project1, project2])});
        let changedProject = project2.set('title', 'changed');

        let nextState = projectsReducer(state, {
          type: UPDATE_PROJECT_SUCCESS,
          payload: changedProject
        });

        expect(nextState.list.get(0)).toBe(project1);
        expect(nextState.list.get(1)).toBe(changedProject);
      });
    });


    describe('SIGN_OUT_SUCCESS', () => {
      it('should reset state', () => {
        let state = new ProjectsState({
          delete: project1,
          list: new List([project1, project2]),
          previous: new List()
        });

        let nextState = projectsReducer(state, {
          type: SIGN_OUT_SUCCESS
        });

        expect(nextState.deleted).toBe(null);
        expect(nextState.list.size).toBe(0);
        expect(nextState.previous).toBe(null);
      });
    });
  });
});
