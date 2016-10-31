import React, { Component } from 'react';
import { Button, FormGroup, InputGroup, FormControl } from 'react-bootstrap';


class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    var searchList = this.state.value.split(' ');
    var termList = [];
    var hashtagList = [];
    for(var item in searchList) {
      if(searchList[item].indexOf('#') === 0) {
        hashtagList.push(searchList[item]);
      } else {
        termList.push(searchList[item]);
      }
    }
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  render() {
    return(
      <InputGroup>
        <FormControl onChange={this.handleChange} type="text" />
        <InputGroup.Button>
          <Button onClick={this.handleSubmit}>Search</Button>
        </InputGroup.Button>
      </InputGroup>
    );
  }
}

export default Search;
