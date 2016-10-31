import React, { Component } from 'react';
import { Nav, NavItem, Tab, Row } from 'react-bootstrap';
import Home from './Home';
import ProjectFeed from './ProjectFeed';
import UserFeed from './UserFeed';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {active: 1};
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(selectedKey) {
    this.setState({active: selectedKey});
    console.log(this.state.active);
  }
  render() {
    return (
      <Tab>
        <Tab.Container
             bsClass={{margin: 0}}
             id="navigation-tabs "
             defaultActiveKey={1}
             onSelect={this.handleSelect}>
          <Row className="clearfix">
            <Nav bsStyle="tabs" justified>
              <NavItem
                  eventKey={1}
                  href="/home"
              >
                Home
              </NavItem>
              <NavItem
                  eventKey={2}
                  href="/projectfeed"
              >
                Project Feed
              </NavItem>
              <NavItem
                  eventKey={3}
                  href="/userfeed"
              >
                User Feed
              </NavItem>
            </Nav>
            <Tab.Content animation>
              <Tab.Pane eventKey={1}>
                <Home />
              </Tab.Pane>
              <Tab.Pane eventKey={2}>
                <h3 style={{marginLeft: 50}}>View and Join projects</h3>
                <ProjectFeed />
              </Tab.Pane>
              <Tab.Pane eventKey={3}>
                <h3 style={{marginLeft: 50}}>View and Connect with Users</h3>
                <UserFeed />
              </Tab.Pane>

            </Tab.Content>
          </Row>
        </Tab.Container>
      </Tab>
    );
  }
}

export default Navigation;
