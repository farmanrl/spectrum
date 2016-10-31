import React, { Component } from 'react';
import firebase from 'firebase';

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

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {users: null};
  }

  componentDidMount() {
    firebase.database().ref('users/')
            .on('value', (snapshot) => {
              this.setState({users: snapshot.val()});
            });
  }

  render() {
    console.log('userlist', this.props.userList);
    console.log('userlist', this.state.users);
    return(
      <div style={styles.Row}>
        {(this.props.userList !== undefined && this.state.users !== null) &&
          Object.keys(this.props.userList).map((user) => (
           <div style={styles.rowItem}>
             <h4 style={{width: 90}}>{this.state.users[user].name}</h4>
             <img height={90} width={90} src={this.state.users[user].photo} role="presentation" />
             <h5 style={styles.title}>{this.state.users[user].type}</h5>
           </div>
         ))
        }
      </div>
    );
  }
}

UserList.propTypes = {
  userList: React.PropTypes.object,
};


export default UserList;
