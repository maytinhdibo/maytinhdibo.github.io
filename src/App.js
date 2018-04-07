import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Home from "./page/Home"
import Login from "./page/Login"
import Signup from "./page/Signup"
import { offalertText } from './dom';
class App extends Component {
  state = {
    auth: !!localStorage.auth
  }
  changeAuth = (e) => {
    this.setState({
      auth: !!e
    })
  }
  componentWillUpdate(){
    offalertText();
  }
  render() {
    const { auth } = this.state;
    return (
      <div>
        <Switch>
          <Route path="/home" render={() => <Home changeAuth={this.changeAuth} auth={auth} />}/>
          <Route path="/" exact component={() => <Login changeAuth={this.changeAuth} auth={auth} />} />
          <Route path="/signup" component={() => <Signup auth={auth} />} />
        </Switch>
        <div id="alert"></div>
      </div>
    )
  }
}

export default App;