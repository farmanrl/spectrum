import { Record } from 'immutable';


export const Project = new Record({
  key: null,
  projectId: null,
  name: null,
  type: null,
  description: null,
  tags: null,
  github: null,
  website: null,
  wanted: null,
  members: null,
});
