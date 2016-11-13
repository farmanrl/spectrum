import firebase from 'firebase';
import * as type from './types';

export function createProfile(profile) {
  return {
    type: type.CREATE_PROFILE,
    profile
  };
}

export function deleteProfile(profileId) {
  return {
    type: type.DELETE_PROFILE,
    profileId
  };
}

export function addConnection(connectionId) {
  return {
    type: type.ADD_CONNECTION,
    connectionId
  };
}

export function removeConnection(connectionId) {
  return {
    type: type.REMOVE_CONNECTION,
    connectionId
  };
}

export function addProfileRole(profileId, role) {
  return {
    type: type.ADD_PROFILE,
    profileId
  };
}

export function removeProfileRole(profileId, role) {
  return {
    type: type.REMOVE_PROFILE_ROLE,
    profileId
  };
}

export function addProfileGithub(profileId, github) {
  return {
    type: type.ADD_PROFILE,
    profileId
  };
}

export function removeProfileGithub(profileId, github) {
  return {
    type: type.REMOVE_PROFILE_GITHUB,
    profileId
  };
}

export function addProfileWebsite(profileId, website) {
  return {
    type: type.ADD_PROFILE,
    profileId
  };
}

export function removeProfileWebsite(profileId, website) {
  return {
    type: type.REMOVE_PROFILE_WEBSITE,
    profileId
  };
}
