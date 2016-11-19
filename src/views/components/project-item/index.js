import { createSelector } from 'reselect';
import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';
import { Panel, ListGroup, ListGroupItem, Media, Button, ButtonToolbar } from 'react-bootstrap';
import { Project } from '../../../core/projects';
import Logo from '../../components/logo';
import RoleList from '../../components/role-list';
import UserList from '../../components/user-list';

class ProjectItem extends Component {
  static propTypes = {
    project: PropTypes.instanceOf(Project).isRequired,
    auth: PropTypes.object.isRequired,
  };

  constructor(props, context) {
    super(props, context);
    this.state = { editing: false, open: false };
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return nextProps.project !== this.props.project ||
           nextState.editing !== this.state.editing ||
           nextState.open !== this.state.open;
  }

  render() {
    const { project } = this.props;
    if (project) {
      return (
        <div>
          <Panel bsClass="panel" collapsible defaultExpanded >
            <Media>
              <Media.Left>
                <Logo type={project.type} />
              </Media.Left>
              <Media.Body>
                <h4>{project.name}</h4>
                <h5>{project.type}</h5>
                <p>{project.description}</p>
                <p>{project.tags}</p>
                <ButtonToolbar>
                  <Button bsSize="sm" href={project.github} disabled>Website</Button>
                  <Button bsSize="sm" href={project.website} disabled>Github</Button>
                  <Button bsSize="sm" bsStyle="primary" disabled>Join</Button>
                  <Button bsSize="sm" bsStyle="primary" disabled>Edit</Button>
                </ButtonToolbar>
              </Media.Body>
            </Media>
            <div style={{ marginTop: 20 }}>
              <Button onClick={() => this.setState({ open: !this.state.open })}>
                More Information
              </Button>
              <Panel collapsible expanded={this.state.open}>
                <ListGroup fill>
                  <ListGroupItem>
                    <h4>Wanted</h4>
                    <RoleList roleList={project.wanted} />
                  </ListGroupItem>
                  <ListGroupItem>
                    <h4>Members</h4>
                    <UserList userList={project.members} />
                  </ListGroupItem>
                </ListGroup>
              </Panel>
            </div>
          </Panel>
        </div>
      );
    }
    return null;
  }
}

const mapStateToProps = createSelector(
  getUid,
  auth => ({ auth })
);

export default connect(
  mapStateToProps,
  authActions
)(ProjectItem);
