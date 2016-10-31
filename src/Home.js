import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import Slide from './Slide';

var styles = {
  home: {
    textAlign: 'center'
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    backgroundColor: '#F5F5F5'
  },
  subheader: {
    display: 'flex',
    flexDirection: 'column',
    height: '80%',
    width: '80%',
    justifyContent: 'space-around',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'white'
  },
  carouselSlide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    overFlow: 'hidden'
  },
  carouselBox: {
    height: '60%',
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white'
  },
};

class Home extends Component {
  render() {
    return(
      <div style={styles.home}>
        <div style={styles.header}>
          <div style={styles.subheader}>
            <h1>Welcome to Spectrum!</h1>
            <h2>Collaboration is Key</h2>
            <p><Button bsStyle="primary">Learn more</Button></p>
          </div>
        </div>
        <Slide />
      </div>
    );
  }
}

export default Home;
