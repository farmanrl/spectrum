import React, { Component } from 'react';
import { Carousel } from 'react-bootstrap';

var styles = {
  slide: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 500,
    overFlow: 'hidden',
  },
  box: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: 'white',
    backgroundColor: 'white'
  }
};

class Slide extends Component {
  constructor(props) {
    super(props);
    this.state = {index: 0, direction: null};
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    });
  }

  render() {
    return(
      <Carousel
          activeIndex={this.state.index}
          direction={this.state.direction}
          onSelect={this.handleSelect}
      >
        <Carousel.Item>
          <div style={Object.assign({}, styles.slide, {backgroundColor: '#80CBC4'})}>
            <div style={styles.box}>
              <h1>Create and Manage Projects</h1>
              <hr />
              <h4>Create projects and recruit team members through our management system.</h4>
              <h4>Get matched with designers, developers, and other roles critical for your projects.</h4>
              <h4>Whether you're starting from scratch with an idea, working on an active prototype, or ready to form a startup,</h4>
              <h4>and Spectrum will work with you every step of the way.</h4>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={Object.assign({}, styles.slide, {backgroundColor: '#E6EE9C'})}>
            <div style={styles.box}>
              <h1>Create a Profile and Collaborate</h1>
              <hr />
              <h4>Customize your profile and showcase your projects, skills, and contributions.</h4>
              <h4>Partner with other users to spread your network and foster connections.</h4>
              <h4>Communicate and collaborate with other motivated people,</h4>
              <h4>and show the world what you can do.</h4>
            </div>
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div style={Object.assign({}, styles.slide, {backgroundColor: '#9FA8DA'})}>
            <div style={styles.box}>
              <h1>Spectrum is Made for You</h1>
              <hr />
              <h4>Check out featured content and search our database for users and projects.</h4>
              <h4>From the student to professional, your experience is tailored for your needs .</h4>
              <h4>Become a part of a new generation of designers, developers, and other aspiring individuals,</h4>
              <h4>and work together to make dreams come true.</h4>
            </div>
          </div>
        </Carousel.Item>
      </Carousel>

    );
  }
}

export default Slide;
