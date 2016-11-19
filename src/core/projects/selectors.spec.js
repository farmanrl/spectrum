import { List } from 'immutable';
import { ProjectsState } from './reducer';
import { getVisibleProjects } from './selectors';
import { Project } from './project';


describe('projects', () => {
  describe('selectors', () => {
    let projects;

    beforeEach(() => {
      projects = new ProjectsState({
        list: new List([
          new Project({completed: false, title: 'project-1'}),
          new Project({completed: true, title: 'project-2'})
        ])
      });
    });


    describe('getVisibleProjects()', () => {
      it('should return list of all projects', () => {
        let projectList = getVisibleProjects({projects});
        expect(projectList.size).toBe(2);
      });

      it('should return list of active (incomplete) projects', () => {
        projects = projects.set('filter', 'active');
        let projectList = getVisibleProjects({projects});

        expect(projectList.size).toBe(1);
        expect(projectList.get(0).title).toBe('project-1');
      });

      it('should return list of completed projects', () => {
        projects = projects.set('filter', 'completed');
        let projectList = getVisibleProjects({projects});

        expect(projectList.size).toBe(1);
        expect(projectList.get(0).title).toBe('project-2');
      });
    });
  });
});
