import firebase from 'firebase';
import React, { Component, PropTypes } from 'react';
import { List } from 'immutable';
import ProjectItem from '../project-item';

class ProjectList extends Component {
  constructor(props) {
    super(props);
    this.state = { projects: null };
  }

  render() {
    const { projects } = this.props;
    if (projects) {
      let projectItems = projects.map((project, index) => {
        return (
          <ProjectItem
              project={project}
              key={index}
          />
        );
      });
      return (
        <div className="project-list">
          {projectItems}
        </div>
      );
    }
    return null;
  }
}

ProjectList.propTypes = {
  projects: PropTypes.instanceOf(List).isRequired,
};

export default ProjectList;
