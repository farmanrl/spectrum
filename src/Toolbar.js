import React, { Component } from 'react';
import CreateUser from './CreateUser';
import CreateProject from './CreateProject';
import LoginUser from './LoginUser';
import firebase from 'firebase';

var styles = {
  buttons: {
    display: 'flex',
    width: 300,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
};

class Toolbar extends Component {
  constructor(props) {
    super(props);
    this.state = {loggedIn: false};
    this.getAuth = this.getAuth.bind(this);
  }

  getAuth() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({loggedIn: true});
      } else {
        this.setState({loggedIn: false});
      }
    });
  }

  render() {
    if (this.state.loggedIn) {
      return(
        <div style={styles.buttons}>
          <CreateUser />
          <CreateProject />
        </div>
      );
    }
    return(
      <LoginUser onClick={this.getAuth} />
    );
  }
}

export default Toolbar;
