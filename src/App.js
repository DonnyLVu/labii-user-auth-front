import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
} from "react-router-dom";
import './App.css';
import HomePage from './HomePage.js'
import Login from './Login.js'
import SignUp from './SignUp.js'
import Todos from './Todos.js'
import PrivateRoute from './PrivateRoute.js';

export default class App extends Component {
  state = {
    username: localStorage.getItem('USERNAME') || '',
    token: localStorage.getItem('TOKEN') || '',
  }

  changeTnN = (userName, token) => {
    localStorage.setItem('TOKEN', token);
    localStorage.setItem('USERNAME', userName);

    this.setState({
      username: userName,
      token: token
    })
  }

  logOut = () => {
    localStorage.setItem('TOKEN', '');
    localStorage.setItem('USERNAME', '');

    this.setState({
      username: '',
      token: ''
    })

  }

  render() {
    return (
      <div>
        <Router>
          <ul className="linksApp , App">
            <div>
              {this.state.username}
              <button onClick={this.logOut}>LOG ME OUT SCOTTY</button>
            </div>
            <Link to="/login"><div>Click ME TO LOG IN</div></Link>
            <Link to="/signup"><div>CLICK ME TO SIGN UP</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <HomePage {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => <Login {...routerProps} changeTnN={this.changeTnN} />} />
            <Route exact path='/signup' render={(routerProps) => <SignUp  {...routerProps} changeTnN={this.changeTnN} />} />
            <PrivateRoute token={this.state.token} exact path='/todos' render={(routerProps) => <Todos {...routerProps} token={this.state.token} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}
