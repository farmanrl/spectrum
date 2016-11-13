import React, { Component } from 'react';
import UserFeedItem from './UserFeedItem';
import firebase from 'firebase';

class UserFeed extends Component {
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
    if (this.state.users !== undefined) {
      return (
        <div style={{width: '80%', margin: 'auto'}}>
          {this.state.users &&
           Object.keys(this.state.users).map((user, index) => (
             <UserFeedItem
                 key={index}
                 userId={user}
                 name={this.state.users[user].name}
                 type={this.state.users[user].type}
                 photo={this.state.users[user].photo}
                 description={this.state.users[user].description}
                 tags={this.state.users[user].tags}
                 github={this.state.users[user].github}
                 website={this.state.users[user].website}
                 skills={this.state.users[user].skills}
                 projects={this.state.users[user].projects}
             />
           ))
          }
        </div>
      );
    }
  }
}

export default UserFeed;
