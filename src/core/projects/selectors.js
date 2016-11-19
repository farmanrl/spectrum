import { createSelector } from 'reselect';

export function getProjects(state) {
  return state.projects;
}

export function getProjectList(state) {
  return getProjects(state).list;
}

export function getProjectFilter(state) {
  return getProjects(state).filter;
}

export function getDeletedProject(state) {
  return getProjects(state).deleted;
}

//=====================================
//  MEMOIZED SELECTORS
//-------------------------------------

export const getVisibleProjects = createSelector(
  getProjectList,
  getProjectFilter,
  (projects, filter) => {
    switch (filter) {
      case 'active':
        return projects.filter(project => !project.completed);

      case 'completed':
        return projects.filter(project => project.completed);

      default:
        return projects;
    }
  }
);
