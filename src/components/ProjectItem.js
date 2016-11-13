import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Media, Button, ButtonToolbar } from 'react-bootstrap';
import Logo from './Logo';
import RoleList from './RoleList';
import UserList from './UserList';
import firebase from 'firebase';

class ProjectItem extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.joinProject = this.joinProject.bind(this);
  }

  joinProject() {
    const user = firebase.auth().currentUser;
    if (user) {
      const updates = {};
      updates['/projects/' + this.props.projectId + '/members/' + user.uid] = user.displayName;
      updates['/users/' + user.uid + '/projects/' + this.props.projectId] = this.props.name;
      firebase.database().ref().update(updates);
    }
  }

  render() {
    return (
      <div>
        <Panel bsClass="panel" collapsible defaultExpanded >
          <Media>
            <Media.Left>
              <Logo type={this.props.type} />
            </Media.Left>
            <Media.Body>
              <h4>{this.props.name}</h4>
              <h5>{this.props.type}</h5>
              <p>{this.props.description}</p>
              <p>{this.props.tags}</p>
              <ButtonToolbar>
                <Button bsSize="sm" href={this.props.github} disabled>Website</Button>
                <Button bsSize="sm" href={this.props.website} disabled>Github</Button>
                <Button bsSize="sm" bsStyle="primary" onClick={this.joinProject}>Join</Button>
              </ButtonToolbar>
            </Media.Body>
          </Media>
          <div style={{marginTop: 20}}>
            <Button onClick={ ()=> this.setState({ open: !this.state.open })}>
              More Information
            </Button>
            <Panel collapsible expanded={this.state.open}>
              <ListGroup fill>
                <ListGroupItem>
                  <h4>Wanted</h4>
                  <RoleList roleList={this.props.wanted} />
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Members</h4>
                  <UserList userList={this.props.members} />
                </ListGroupItem>
              </ListGroup>
          </Panel>
          </div>
        </Panel>
      </div>
    );
  }
}

ProjectItem.propTypes = {
  projectId: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  description: React.PropTypes.string,
  tags: React.PropTypes.array,
  github: React.PropTypes.string,
  website: React.PropTypes.string,
  wanted: React.PropTypes.array,
  members: React.PropTypes.object,
};

export default ProjectItem;
