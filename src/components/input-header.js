import React, { Component } from 'react';
import {alertText} from './../dom.js';
class Header extends Component {
  addNew = () => {
    if (document.querySelector("#input").value.length < 1) {
      alertText("Your text is empty!",true);
    } else {
      this.props.addNew(this.state.value);
      this.setState({
        value: ""
      });
      alertText("Adding new reminder....");
    }
  }

  enterKey = (e) => {
    if (e.key === 'Enter') {
      this.addNew();
      return false;
    }
  }
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    }
  }
  componentDidMount() {
    this.setState({ value: this.props.text });
  }
  _onChange = (e) => {
    this.setState({
      value: e.target.value
    });
  }
  render() {
    return (
      <div id="header">
        <span>Add new work</span>
        <input id="input" onChange={this._onChange} onKeyPress={this.enterKey} value={this.state.value} placeholder="Type a remind...." type="text" /><button onClick={this.addNew} id="add">Add</button>
      </div>
    )
  }
}
export default Header;