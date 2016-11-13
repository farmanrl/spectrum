import { Record } from 'immutable';

export const Project = new Record({
  name: null,
  description: null,
  tags: null,
  type: null,
  wanted: {
    frontend: null,
    backend: null,
    design: null,
    research: null,
    outreach: null,
    media: null,
  },
  website: null,
  github: null,
  githubValid: null,
  websiteValid: null,
});
