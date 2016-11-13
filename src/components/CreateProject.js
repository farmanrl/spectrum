import React, { Component, PropTypes } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Panel, Alert } from 'react-bootstrap';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { projectsActions } from '../redux/projects/actions';


class CreateProject extends Component {
  static propTypes = {
    createProject: PropTypes.func.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = {
      showModal: false,
      name: '',
      description: '',
      tags: '',
      type: '',
      wanted: {
        frontend: false,
        backend: false,
        design: false,
        research: false,
        outreach: false,
        media: false,
      },
      website: '',
      github: '',
      githubValid: '',
      websiteValid: '',
      invalid: null,
    };
  }

  getGithubValidation = () => {
    const github = this.state.github;
    if (this.getValidation(github) === 'success') {
      if (github.indexOf('github') > -1) {
        return 'success';
      }
      return 'warning';
    }
    return 'error';
  }

  getWebsiteValidation = () => {
    const website = this.state.website;
    if (this.getValidation(website) === 'success') {
      return 'success';
    }
    return 'error';
  }

  getValidation = (str) => {
    const pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!pattern.test(str)) {
      return 'error';
    }
    return 'success';
  }

  handleChange = key => (event) => {
    const state = {};
    state[key] = event.target.value;
    this.setState(state);
  }

  handleTags = (tags) => {
    var regexp = /(\s|^)\w\w+\b/gm;
    var result = tags.match(regexp);
    if (result) {
      result = result.map(function(s) {
        return s.trim();
      });
      return result.slice(0,10);
    }
    return null;
  }

  handleCheck = (key) => {
    return () => {
      var state = this.state.wanted;
      state[key] = !this.state.wanted[key];
      this.setState({wanted: state});
    };
  }

  onSubmit = () => {
    event.preventDefault();
    const name = this.state.name.trim();
    const description = this.state.name.trim();
    const website = this.state.website.trim();
    const github = this.state.github.trim();
    const type = this.state.type.trim();
    const tags = this.handleTags(this.state.tags);
    const wanted = Object.keys(this.state.wanted).filter((key) => {
      return this.state.wanted[key];
    });
    const created = firebase.database.ServerValue.TIMESTAMP;
    const project = {
      name,
      description,
      tags,
      type,
      wanted,
      website,
      github,
      created
    };
    this.close();
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open= () => {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <div>
        <Button
            bsStyle="primary"
            bsSize="small"
            onClick={this.open}
        >
          Create Project
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Enter your project information</h4>
            <form>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Enter a name for your project</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Name"
                    onChange={this.handleChange('name')}
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Enter a description for your project</ControlLabel>
                <FormControl
                    componentClass="textarea"
                    placeholder="Description"
                    onChange={this.handleChange('description')}
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Enter tags for your project</ControlLabel>
                <FormControl
                    type="text"
                    placeholder="Tags"
                    onChange={this.handleChange('tags')}
                />
              </FormGroup>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Choose a category</ControlLabel>
                <FormControl
                    componentClass="select"
                    placeholder="Category"
                    onChange={this.handleChange('type')}
                >
                  <option value="idea">Idea</option>
                  <option value="prototype">Prototype</option>
                  <option value="startup">Startup</option>
                </FormControl>
              </FormGroup>
              {(this.state.type === 'prototype' || this.state.type === 'startup') &&
              <FormGroup
                  controlId="formBasicText"
                  validationState={this.getGithubValidation()}
              >
                <ControlLabel>Github</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.github}
                    placeholder="Enter github"
                    onChange={this.handleChange('github')}
                />
                <FormControl.Feedback />
                <HelpBlock>Required for prototype.</HelpBlock>
              </FormGroup>
              }
              {this.state.type === 'startup' &&
              <FormGroup
                  controlId="formBasicText"
                  validationState={this.getWebsiteValidation()}
              >
                <ControlLabel>Website</ControlLabel>
                <FormControl
                    type="text"
                    value={this.state.website}
                    placeholder="Enter a valid website url"
                    onChange={this.handleChange('website')}
                />
                <FormControl.Feedback />
                <HelpBlock>Required for startup.</HelpBlock>
              </FormGroup>
              }
              <FormGroup>
                <ControlLabel>Wanted</ControlLabel>
                <Panel>
                <Checkbox onChange={this.handleCheck('frontend')}>
                  Developer - Front End
                </Checkbox>
                {' '}
                <Checkbox onChange={this.handleCheck('backend')}>
                  Developer - Back End
                </Checkbox>
                {' '}
                <Checkbox onChange={this.handleCheck('design')}>
                  Designer
                </Checkbox>
                {' '}
                <Checkbox onChange={this.handleCheck('media')}>
                  Media
                </Checkbox>
                {' '}
                <Checkbox onChange={this.handleCheck('research')}>
                  Research
                </Checkbox>
                {' '}
                <Checkbox onChange={this.handleCheck('outreach')}>
                  Outreach
                </Checkbox>
                </Panel>
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            {this.state.invalid &&
             <Alert bsStyle="warning">
               Submission denied, check that all forms are valid.
             </Alert>
            }
            <Button bsStyle="primary" onClick={this.handleSubmit}>Submit</Button>
          </Modal.Footer>
        </Modal>
      </div>
      );
  }
}

const mapDispatchToProps = Object.assign(
  {},
  projectsActions,
);

export default connect(
  mapDispatchToProps
)(CreateProject);
