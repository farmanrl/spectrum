import { Simulate } from 'react-addons-test-utils';
import { createTestComponent } from 'test/utils';
import { Project } from 'src/core/projects';
import ProjectItem from './index';


describe('ProjectItem', () => {
  let project;
  let projectItem;


  beforeEach(() => {
    project = new Project({completed: true, title: 'test'});

    projectItem = createTestComponent(ProjectItem, {
      project,
      deleteProject: sinon.spy(),
      updateProject: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should initialize #state.editing to be false', () => {
      expect(projectItem.state.editing).toEqual(false);
    });

    it('should initialize #props.project with a Project instance', () => {
      expect(projectItem.props.project instanceof Project).toBe(true);
    });
  });


  describe('Component methods:', () => {
    describe('#delete', () => {
      it('should call #projectActions.deleteProject', () => {
        projectItem.delete();
        expect(projectItem.props.deleteProject.callCount).toEqual(1);
        expect(projectItem.props.deleteProject.calledWith(projectItem.props.project)).toEqual(true);
      });
    });

    describe('#editTitle', () => {
      it('should set #state.editing to `true`', () => {
        projectItem.editTitle();
        expect(projectItem.state.editing).toEqual(true);
      });
    });

    describe('#stopEditing', () => {
      it('should set #state.editing to `false`', () => {
        projectItem.state.editing = true;
        projectItem.stopEditing();
        expect(projectItem.state.editing).toEqual(false);
      });
    });

    describe('#saveTitle', () => {
      it('should do nothing if not editing', () => {
        projectItem.stopEditing = sinon.spy();
        projectItem.state.editing = false;
        projectItem.saveTitle();
        expect(projectItem.stopEditing.callCount).toEqual(0);
      });

      it('should set #state.editing to `false`', () => {
        projectItem.state.editing = true;
        projectItem.saveTitle({
          target: {value: ''}
        });
        expect(projectItem.state.editing).toEqual(false);
      });

      it('should call #projectActions.updateProject', () => {
        projectItem.state.editing = true;
        projectItem.saveTitle({
          target: {value: 'foo'}
        });
        expect(projectItem.props.updateProject.callCount).toEqual(1);
        expect(projectItem.props.updateProject.args[0][0]).toEqual(project);
        expect(projectItem.props.updateProject.args[0][1].title).toEqual('foo');
      });
    });

    describe('#toggleStatus', () => {
      it('should call #projectActions.updateProject', () => {
        projectItem.toggleStatus({
          target: {checked: true}
        });

        expect(projectItem.props.updateProject.callCount).toEqual(1);
      });

      it('should toggle project.complete', () => {
        projectItem.toggleStatus();
        expect(projectItem.props.updateProject.args[0][1].completed).toEqual(!project.completed);
      });
    });

    describe('#onKeyUp', () => {
      describe('with enter key', () => {
        it('should call #saveTitle with event object', () => {
          projectItem.saveTitle = sinon.spy();
          projectItem.onKeyUp({keyCode: 13});
          expect(projectItem.saveTitle.callCount).toEqual(1);
        });
      });

      describe('with escape key', () => {
        it('should set #state.editing to `false`', () => {
          projectItem.state.editing = true;
          projectItem.onKeyUp({keyCode: 27});
          expect(projectItem.state.editing).toEqual(false);
        });
      });
    });
  });


  describe('DOM', () => {
    describe('`click` event triggered on toggle-status button', () => {
      it('should call #toggleStatus()', () => {
        projectItem.toggleStatus = sinon.spy();
        projectItem.setState({editing: true});
        Simulate.click(projectItem.toggleStatusButton);
        expect(projectItem.toggleStatus.callCount).toEqual(1);
      });
    });


    describe('title', () => {
      it('should be rendered as a text input field when editing', () => {
        projectItem.setState({editing: true});
        let element = projectItem.titleInput;
        expect(element.tagName).toEqual('INPUT');
      });

      it('should be rendered as text when not editing', () => {
        projectItem.setState({editing: false});
        let element = projectItem.titleText;
        expect(element.innerText).toEqual(project.title);
      });
    });


    describe('`blur` event triggered on text field', () => {
      it('should call #saveTitle()', () => {
        projectItem.saveTitle = sinon.spy();
        projectItem.setState({editing: true});
        Simulate.blur(projectItem.titleInput);
        expect(projectItem.saveTitle.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and project title', () => {
        projectItem.setState({editing: true});
        Simulate.blur(projectItem.titleInput);
        expect(projectItem.titleInput).toBe(null);
        expect(projectItem.titleText).toBeDefined();
      });
    });


    describe('`keyup` event triggered with enter key on text field', () => {
      it('should call #saveTitle()', () => {
        projectItem.saveTitle = sinon.spy();
        projectItem.setState({editing: true});
        Simulate.keyUp(projectItem.titleInput, {keyCode: 13});
        expect(projectItem.saveTitle.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and project title', () => {
        projectItem.setState({editing: true});
        Simulate.keyUp(projectItem.titleInput, {keyCode: 13});
        expect(projectItem.titleInput).toBe(null);
        expect(projectItem.titleText).toBeDefined();
      });
    });


    describe('`keyup` event triggered with escape key on text field', () => {
      it('should call #stopEditing()', () => {
        projectItem.stopEditing = sinon.spy();
        projectItem.setState({editing: true});
        Simulate.keyUp(projectItem.titleInput, {keyCode: 27});
        expect(projectItem.stopEditing.callCount).toEqual(1);
      });

      it('should toggle visibility of text field and project title', () => {
        projectItem.setState({editing: true});
        Simulate.keyUp(projectItem.titleInput, {keyCode: 27});
        expect(projectItem.titleInput).toBe(null);
        expect(projectItem.titleText).toBeDefined();
      });
    });


    describe('`click` event triggered on edit button', () => {
      it('should display text field', () => {
        Simulate.click(projectItem.editButton);
        expect(projectItem.titleInput).toBeDefined();
      });

      it('should hide project title', () => {
        Simulate.click(projectItem.editButton);
        expect(projectItem.titleText).toBe(null);
      });
    });


    describe('`click` event triggered on delete button', () => {
      it('should call #delete()', () => {
        projectItem.delete = sinon.spy();
        projectItem.setState({editing: true});
        Simulate.click(projectItem.deleteButton);
        expect(projectItem.delete.callCount).toEqual(1);
      });
    });
  });
});
