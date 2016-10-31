import React, { Component } from 'react';
import { Panel, ListGroup, ListGroupItem, Media, Button, ButtonToolbar } from 'react-bootstrap';
import RoleList from './RoleList';
import ProjectList from './ProjectList';

import firebase from 'firebase';

class UserFeedItem extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
    this.connect = this.connect.bind(this);
  }

  connect() {
    var user = firebase.auth().currentUser;
    if (user && user.uid !== this.props.userId) {
      var connectRef = firebase.database().ref().child('/users/' + this.props.userId + '/connections/');
      var connect = connectRef.push();
      connect.set(user.uid);
    }
  }

  render() {
    return(
      <div>
        <Panel bsClass="panel" collapsible defaultExpanded >
          <Media>
            <Media.Left>
              <img height={64} width={64} src={this.props.photo} role="presentation" />
            </Media.Left>
            <Media.Body>
              <Media.Heading>{this.props.name}</Media.Heading>
              <p>{this.props.type}</p>
              <p>{this.props.description}</p>
              <p>{this.props.tags}</p>
              <ButtonToolbar>
                <Button bsSize="sm" href={this.props.github} disabled>Website</Button>
                <Button bsSize="sm" href={this.props.website} disabled>Github</Button>
                <Button bsSize="sm" bsStyle="primary" onClick={this.connect}>Connect</Button>
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
                  <h4>Skills</h4>
                  <RoleList roleList={this.props.skills} />
                </ListGroupItem>
                <ListGroupItem>
                  <h4>Projects</h4>
                  <ProjectList projectList={this.props.projects} />
                </ListGroupItem>
              </ListGroup>
            </Panel>
          </div>
        </Panel>
      </div>
    );
  }
}

UserFeedItem.propTypes = {
  userId: React.PropTypes.string,
  name: React.PropTypes.string,
  type: React.PropTypes.string,
  photo: React.PropTypes.string,
  description: React.PropTypes.string,
  tags: React.PropTypes.array,
  github: React.PropTypes.string,
  website: React.PropTypes.string,
  skills: React.PropTypes.array,
  projects: React.PropTypes.object,
};

export default UserFeedItem;
