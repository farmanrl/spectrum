import { FirebaseList } from 'src/core/firebase';
import * as projectActions from './actions';
import { Project } from './project';


export const projectList = new FirebaseList({
  onAdd: projectActions.createProjectSuccess,
  onChange: projectActions.updateProjectSuccess,
  onLoad: projectActions.loadProjectsSuccess,
  onRemove: projectActions.deleteProjectSuccess
}, Project);
