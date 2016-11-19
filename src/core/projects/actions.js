import { getDeletedProject } from './selectors';
import { projectList } from './project-list';
import {
  CREATE_PROJECT_ERROR,
  CREATE_PROJECT_SUCCESS,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_SUCCESS,
  FILTER_PROJECTS,
  LOAD_PROJECTS_SUCCESS,
  UNDELETE_PROJECT_ERROR,
  UNLOAD_PROJECTS_SUCCESS,
  UPDATE_PROJECT_ERROR,
  UPDATE_PROJECT_SUCCESS
} from './action-types';


export function createProject(project) {
  return dispatch => {
    projectList.push({ project })
      .catch(error => dispatch(createProjectError(error)));
  };
}

export function createProjectError(error) {
  return {
    type: CREATE_PROJECT_ERROR,
    payload: error
  };
}

export function createProjectSuccess(project) {
  return {
    type: CREATE_PROJECT_SUCCESS,
    payload: project
  };
}

export function deleteProject(project) {
  return dispatch => {
    projectList.remove(project.key)
      .catch(error => dispatch(deleteProjectError(error)));
  };
}

export function deleteProjectError(error) {
  return {
    type: DELETE_PROJECT_ERROR,
    payload: error
  };
}

export function deleteProjectSuccess(project) {
  return {
    type: DELETE_PROJECT_SUCCESS,
    payload: project
  };
}

export function undeleteProject() {
  return (dispatch, getState) => {
    const project = getDeletedProject(getState());
    if (project) {
      projectList.set(project.key, {completed: project.completed, title: project.title})
        .catch(error => dispatch(undeleteProjectError(error)));
    }
  };
}

export function undeleteProjectError(error) {
  return {
    type: UNDELETE_PROJECT_ERROR,
    payload: error
  };
}

export function updateProjectError(error) {
  return {
    type: UPDATE_PROJECT_ERROR,
    payload: error
  };
}

export function updateProject(project, changes) {
  return dispatch => {
    projectList.update(project.key, changes)
      .catch(error => dispatch(updateProjectError(error)));
  };
}

export function updateProjectSuccess(project) {
  return {
    type: UPDATE_PROJECT_SUCCESS,
    payload: project
  };
}

export function loadProjectsSuccess(projects) {
  return {
    type: LOAD_PROJECTS_SUCCESS,
    payload: projects
  };
}

export function filterProjects(filterType) {
  return {
    type: FILTER_PROJECTS,
    payload: { filterType }
  };
}

export function loadProjects() {
  return (dispatch) => {
    projectList.path = 'projects/';
    projectList.subscribe(dispatch);
  };
}

export function unloadProjects() {
  projectList.unsubscribe();
  return {
    type: UNLOAD_PROJECTS_SUCCESS
  };
}
