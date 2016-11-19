import { Simulate } from 'react-addons-test-utils';
import { findDOMNode } from 'react-dom';
import { createTestComponent } from 'test/utils';
import ProjectForm from './index';


describe('ProjectForm', () => {
  let projectForm;


  beforeEach(() => {
    projectForm = createTestComponent(ProjectForm, {
      createProject: sinon.spy()
    });
  });


  describe('Instantiation:', () => {
    it('should set #state.title with an empty string', () => {
      expect(projectForm.state.title).toEqual('');
    });
  });


  describe('Component methods:', () => {
    describe('#clearInput', () => {
      it('should set #state.title with an empty string', () => {
        projectForm.state.title = 'foo';
        expect(projectForm.state.title).toEqual('foo');

        projectForm.clearInput();
        expect(projectForm.state.title).toEqual('');
      });
    });


    describe('#onChange', () => {
      it('should set #state.title with event.target.value', () => {
        const event = {target: {value: 'value'}};
        projectForm.onChange(event);
        expect(projectForm.state.title).toEqual(event.target.value);
      });
    });


    describe('#onKeyUp', () => {
      describe('with escape key', () => {
        it('should set #state.title with an empty string', () => {
          projectForm.state.title = 'foo';
          projectForm.onKeyUp({keyCode: 27});
          expect(projectForm.state.title).toEqual('');
        });
      });
    });


    describe('#onSubmit', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        projectForm.onSubmit(event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should call projectActions#createProject with #state.title', () => {
        const event = {preventDefault: sinon.spy()};

        projectForm.state.title = 'foo';
        projectForm.onSubmit(event);

        expect(projectForm.props.createProject.callCount).toEqual(1);
        expect(projectForm.props.createProject.calledWith('foo')).toEqual(true);
      });

      it('should set #state.title with an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        projectForm.state.title = 'foo';
        projectForm.onSubmit(event);

        expect(projectForm.state.title).toEqual('');
      });

      it('should not save if title evaluates to an empty string', () => {
        const event = {preventDefault: sinon.spy()};

        projectForm.state.title = '';
        projectForm.onSubmit(event);

        expect(projectForm.props.createProject.callCount).toBe(0);

        projectForm.state.title = '    ';
        projectForm.onSubmit(event);

        expect(projectForm.props.createProject.callCount).toBe(0);
      });
    });
  });


  describe('DOM:', () => {
    describe('`keyup` event triggered on text field with escape key', () => {
      it('should set #state.title with an empty string', () => {
        projectForm.setState({title: 'foo'});
        Simulate.keyUp(projectForm.titleInput, {keyCode: 27});
        expect(projectForm.state.title).toEqual('');
      });

      it('should set text field value with an empty string', () => {
        projectForm.setState({title: 'foo'});
        Simulate.keyUp(projectForm.titleInput, {keyCode: 27});
        expect(projectForm.titleInput.value).toEqual('');
      });
    });


    describe('`change` event triggered on text field', () => {
      it('should set #state.title with the value from the text field', () => {
        projectForm.titleInput.value = 'foo';
        expect(projectForm.state.title).toEqual('');
        Simulate.change(projectForm.titleInput);
        expect(projectForm.state.title).toEqual('foo');
      });
    });


    describe('`submit` event triggered on form', () => {
      it('should prevent the default action of the event', () => {
        const event = {preventDefault: sinon.spy()};
        Simulate.submit(findDOMNode(projectForm), event);
        expect(event.preventDefault.callCount).toEqual(1);
      });

      it('should set text field value with an empty string', () => {
        const event = {preventDefault: sinon.spy()};
        projectForm.setState({title: 'foo'});
        Simulate.submit(findDOMNode(projectForm), event);
        expect(projectForm.titleInput.value).toEqual('');
      });
    });
  });
});
