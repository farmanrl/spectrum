import { subscribe } from '../../redux/firebase/';
import * as actions from './actions';
import { Project } from './project';

export const projectList = subscribe({
  onAdd: actions.createProjectSuccess,
  onChange: actions.updateProjectSuccess,
  onLoad: actions.loadProjectsSuccess,
  onRemove: actions.deleteProjectSuccess
}, Project);
