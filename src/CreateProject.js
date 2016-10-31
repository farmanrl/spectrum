import React, { Component } from 'react';
import { Modal, Button, FormGroup, FormControl, ControlLabel, HelpBlock, Checkbox, Panel, Alert } from 'react-bootstrap';
import firebase from 'firebase';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: '',
      description: '',
      tags: '',
      type: 'idea',
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
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.getGithubValidation = this.getGithubValidation.bind(this);
    this.getWebsiteValidation = this.getWebsiteValidation.bind(this);
    this.getValidation = this.getValidation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleCheck = this.handleCheck.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  getGithubValidation() {
    var github = this.state.github;
    if (this.getValidation(github) === 'success') {
      if (github.indexOf('github') > -1) {
        return 'success';
      } else {
        return 'warning';
      }
    } else {
      return 'error';
    }
  }

  getWebsiteValidation() {
    var website = this.state.website;
    if (this.getValidation(website) === 'success') {
      return 'success';
    } else {
      return 'error';
    }
  }

  getValidation(str) {
    var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if(!pattern.test(str)) {
      return 'error';
    } else {
      return 'success';
    }
  }

  handleChange(key) {
    return function (e) {
      var state = {};
      state[key] = e.target.value;
      this.setState(state);
    }.bind(this);
  }

  handleTags(tags) {
    var regexp = /(\s|^)\w\w+\b/gm;
    var result = tags.match(regexp);
    if (result) {
      result = result.map(function(s) {
        return s.trim();
      });
      return result.slice(0,10);
    } else {
      return null;
    }
  }

  handleCheck(key) {
    return function () {
      var state = this.state.wanted;
      state[key] = !this.state.wanted[key];
      this.setState({wanted: state});
    }.bind(this);
  }

  handleSubmit() {
    var user = firebase.auth().currentUser;
    if (user) {
      var tags = this.handleTags(this.state.tags);
      var wanted = Object.keys(this.state.wanted).filter((key) => {
        return this.state.wanted[key];
      });
      if (this.state.name === '' || !this.state.description === '' || tags === [] || !wanted === []) {
        this.setState({invalid: true});
        return;
      }
      var projectId = firebase.database().ref().child('/projects').push().key;
      var updates = {};
      firebase.database().ref('/projects/' + projectId).set({
        name: this.state.name,
        description: this.state.description,
        tags: tags,
        type: this.state.type,
        wanted: wanted,
        website: this.state.website,
        github: this.state.github,
        created: firebase.database.ServerValue.TIMESTAMP
      });
      updates['/projects/' + projectId + '/members/' + user.uid] = user.displayName;
      updates['/users/' + user.uid + '/projects/' + projectId] = this.state.name;
      firebase.database().ref().update(updates);
      this.close();
    }
  }

  render() {
    return(
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

export default CreateProject;
