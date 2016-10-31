import React, { Component } from 'react';
import ProjectFeedItem from './ProjectFeedItem';
import firebase from 'firebase';

class ProjectFeed extends Component {
  constructor(props) {
    super(props);
    this.state = {projects: null};
  }

  componentDidMount() {
    firebase.database().ref('projects/')
            .on('value', (snapshot) => {
              this.setState({projects: snapshot.val()});
            });
  }

  render() {
    if (this.state.projects !== undefined) {
      return (
        <div style={{width: '80%', margin: 'auto'}}>
          {this.state.projects &&
           Object.keys(this.state.projects).map((project, index) => (
             <ProjectFeedItem
                 key={index}
                 projectId={project}
                 name={this.state.projects[project].name}
                 type={this.state.projects[project].type}
                 description={this.state.projects[project].description}
                 tags={this.state.projects[project].tags}
                 github={this.state.projects[project].github}
                 website={this.state.projects[project].website}
                 wanted={this.state.projects[project].wanted}
                 members={this.state.projects[project].members}
             />
           ))
          }
        </div>
      );
    }
  }
}

export default ProjectFeed;
