import React, { Component } from 'react';
import firebase from 'firebase';
import { Button, ButtonToolbar, Modal } from 'react-bootstrap';

class LoginUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.logout = this.logout.bind(this);
    this.GithubLogin = this.GithubLogin.bind(this);
    this.FacebookLogin = this.FacebookLogin.bind(this);
    this.GoogleLogin = this.GoogleLogin.bind(this);
  }

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  logout() {
    firebase.auth().signOut();
    this.forceUpdate();
  }

  GoogleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    firebase.auth().signInWithPopup(provider).then(() => {
      this.close();
    });
  }

  FacebookLogin() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('public_profile');
    firebase.auth().signInWithPopup(provider).then(() => {
      this.close();
    });
  }

  GithubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider).then(() => {
      this.close();
    });
  }


  render() {
    if (firebase.auth().currentUser === null) {
      console.log('signed in');
      return (
        <div>
          <Button
              bsStyle="primary"
              bsSize="small"
              onClick={this.open}
          >
            Sign In
          </Button>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Choose your login provider</h4>
              <ButtonToolbar>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.GoogleLogin}
                >
                  Google
                </Button>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.FacebookLogin}
                >
                  Facebook
                </Button>
                <Button
                    bsStyle="primary"
                    bsSize="large"
                    onClick={this.GithubLogin}
                >
                  Github
                </Button>
              </ButtonToolbar>
            </Modal.Body>
          </Modal>
        </div>
      );
    }
    return (
      <Button
          bsStyle="primary"
          bsSize="small"
          onClick={this.logout}
      >
        Sign Out
      </Button>
    );
  }
}

export default LoginUser;
