import * as type from './actionTypes';

export function addProject(project) {
  return {
    type: type.ADD_PROJECT,
    project
  };
}

export function removeProject(projectID) {
  return {
    type: type.REMOVE_PROJECT,
    projectID
  };
}

export function addProjectPartner(projectID, userID) {
  return {
    type: type.ADD_PROJECT_PARTNER,
    projectID,
    userID
  };
}

export function removeProjectPartner(projectID, userID) {
  return {
    type: type.REMOVE_PROJECT_PARTNER,
    projectID,
    userID
  };
}

export function addProjectRole(projectID, role) {
  return {
    type: type.ADD_PROJECT,
    project
  };
}

export function removeProjectRole(projectID, role) {
  return {
    type: type.REMOVE_PROJECT_ROLE,
    projectID
  };
}

export function signInUser() {

export function getUser() {
  return {
    type: type.GET_USER
  }
