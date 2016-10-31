import React, { Component } from 'react';
import Role from './Role';

var styles = {
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

var roles = {
  frontend: 'Front-End',
  backend: 'Back-End',
  design: 'Designer',
  research: 'Research',
  outreach: 'Outreach',
  media: 'Media',
};

class RoleList extends Component {
  render() {
    console.log(this.props.roleList);
    return(
      <div style={styles.row}>
        {this.props.roleList !== [] &&
         Object.keys(this.props.roleList).map((index) => (
           <div style={styles.rowItem}>
             <h4 style={styles.role}>{roles[this.props.roleList[index]]}</h4>
             <Role role={this.props.roleList[index]} />
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
