import React, { Component } from 'react';
import Logo from './Logo';
import firebase from 'firebase';
var styles = {
  Row: {
    overflowX: 'scroll',
    display: 'flex',
  },
  RowItem: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  }
};

class ProjectList extends Component {
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
    console.log('projectlist',this.props.projectList);

    return(
      <div style={styles.Row}>
        {(this.props.projectList !== undefined && this.state.projects !== null) &&
         Object.keys(this.props.projectList).map((project) => (
           <div style={styles.RowItem}>
             <h4 style={{width: 90}}>{this.state.projects[project].name}</h4>
             <Logo type={this.state.projects[project].type} />
             <h5 style={{width: 90}}>{this.state.projects[project].type}</h5>
           </div>
         ))
        }
      </div>
    );
  }
}

ProjectList.propTypes = {
  projectList: React.PropTypes.object,
};


export default ProjectList;
