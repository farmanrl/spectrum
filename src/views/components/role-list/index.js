import React, { Component } from 'react';
import Role from '../role-item';

const styles = {
  row: {
    overflowX: 'scroll',
    display: 'flex',
  },
  rowItem: {
    margin: 20,
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
  },
  title: {
    width: 90,
  },
};

const roles = {
  frontend: 'Front-End',
  backend: 'Back-End',
  design: 'Designer',
  research: 'Research',
  outreach: 'Outreach',
  media: 'Media',
};

class RoleList extends Component {
  render() {
    return (
      <div style={styles.row}>
        {this.props.roleList !== [] &&
         Object.keys(this.props.roleList).map((role) => (
           <div style={styles.rowItem} key={role} >
             <h4 style={styles.role}>{roles[this.props.roleList[role]]}</h4>
             <Role role={this.props.roleList[role]} />
           </div>
         ))
        }
      </div>
    );
  }
}

RoleList.propTypes = {
  roleList: React.PropTypes.array,
};

export default RoleList;
