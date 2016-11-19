import { List } from 'immutable';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { getNotification, notificationActions } from '../../../core/notification';
import { getProjectFilter, getVisibleProjects, projectsActions } from '../../../core/projects';
import Notification from '../../components/notification';
import ProjectFilters from '../../components/project-filters';
import ProjectForm from '../../components/project-form';
import ProjectList from '../../components/project-list';


export class Projects extends Component {
  static propTypes = {
    createProject: PropTypes.func.isRequired,
    dismissNotification: PropTypes.func.isRequired,
    filterProjects: PropTypes.func.isRequired,
    filterType: PropTypes.string.isRequired,
    loadProjects: PropTypes.func.isRequired,
    location: PropTypes.object.isRequired,
    notification: PropTypes.object.isRequired,
    projects: PropTypes.instanceOf(List).isRequired,
    undeleteProject: PropTypes.func.isRequired,
    unloadProjects: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.props.loadProjects();
    this.props.filterProjects(this.props.location.query.filter);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.query.filter !== this.props.location.query.filter) {
      this.props.filterProjects(nextProps.location.query.filter);
    }
  }

  componentWillUnmount() {
    this.props.unloadProjects();
  }

  renderNotification() {
    const { notification } = this.props;
    return (
      <Notification
        action={this.props.undeleteProject}
        actionLabel={notification.actionLabel}
        dismiss={this.props.dismissNotification}
        display={notification.display}
        message={notification.message}
      />
    );
  }

  render() {
    return (
      <div className="g-row">
        <div className="g-col">
          <ProjectForm createProject={this.props.createProject} />
        </div>

        <div className="g-col">
          <ProjectFilters filter={this.props.filterType} />
          <ProjectList
            projects={this.props.projects}
          />
        </div>

        {this.props.notification.display ? this.renderNotification() : null}
      </div>
    );
  }
}

const mapStateToProps = createSelector(
  getNotification,
  getProjectFilter,
  getVisibleProjects,
  (notification, filterType, projects) => ({
    notification,
    filterType,
    projects
  })
);

const mapDispatchToProps = Object.assign(
  {},
  projectsActions,
  notificationActions
);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Projects);
