import firebase from 'firebase';
import * as type from './types';

function authenticate(provider) {
  return dispatch => {
    firebaseAuth.signInWithPopup(provider)
                .then(result => dispatch(signInSuccess(result)))
                .catch(error => dispatch(signInError(error)));
  };
}


export function addProject(project) {
  return {
    type: type.ADD_PROJECT,
    project
  };
}

export function removeProject(projectId) {
  return {
    type: type.REMOVE_PROJECT,
    projectId
  };
}

export function addProjectPartner(partnerId) {
  return {
    type: type.ADD_PROJECT_PARTNER,
    partnerId
  };
}

export function removeProjectPartner(partnerId) {
  return {
    type: type.REMOVE_PROJECT_PARTNER,
    partnerId
  };
}


export function addProjectRole(projectId, role) {
  return {
    type: type.ADD_PROJECT,
    projectId,
    role
  };
}

export function removeProjectRole(projectId, role) {
  return {
    type: type.REMOVE_PROJECT_ROLE,
    projectId,
    role
  };
}

export function addProjectGithub(projectId, github) {
  return {
    type: type.ADD_PROJECT,
    projectId,
    github
  };
}

export function removeProjectGithub(projectId, github) {
  return {
    type: type.REMOVE_PROJECT_GITHUB,
    projectId,
    github
  };
}

export function addProjectWebsite(projectId, website) {
  return {
    type: type.ADD_PROJECT,
    projectId,
    website
  };
}

export function removeProjectWebsite(projectId, website) {
  return {
    type: type.REMOVE_PROJECT_WEBSITE,
    projectId,
    website
  };
}
