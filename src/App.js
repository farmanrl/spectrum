import React, { Component } from 'react';
import Navigation from './Navigation';
import CreateUser from './CreateUser';
import CreateProject from './CreateProject';
import LoginUser from './LoginUser';
import Search from './Search';
import firebase from 'firebase';

var config = {
  apiKey: "AIzaSyC6ZqhUHiRheH7pfEad2l_p_l3GPL_jnUU",
  authDomain: "spectrum-c5087.firebaseapp.com",
  databaseURL: "https://spectrum-c5087.firebaseio.com",
  storageBucket: "",
  messagingSenderId: "439104137133"
};
firebase.initializeApp(config);

var styles = {
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    margin: '0px 20px 0px 20px'
  },
  title: {
    width: 180,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#333'
  },
  search: {
    width: '50%'
  },
  buttons: {
    display: 'flex',
    width: 300,
    margin: 10,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
};

var logo = "https://lh5.ggpht.com/LdeTCmBgU2a7wTwDB_zYR-ltq9PTWTWR2NCx_Ad9FoNaSaPMNCDJBBnaoM2QeLop5YXS=w300"

class App extends Component {
  render() {
    return (
      <div>
        <div style={styles.toolbar}>
          <div style={styles.title}>
            <img src={logo} width={36} height={36} role="presentation" />
            <h2>Spectrum</h2>
          </div>
          <div style={styles.buttons}>
            <LoginUser />
            <CreateUser />
            <CreateProject />
          </div>
        </div>
        <Navigation />
      </div>
    );
  }
}

export default App;
