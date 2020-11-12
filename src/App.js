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

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <ul className="linksApp">
            <Link to="/login"><div>Click ME TO LOG IN</div></Link>
            <Link to="/signup"><div>CLICK ME TO SIGN UP</div></Link>
          </ul>
          <Switch>
            <Route exact path='/' render={(routerProps) => <HomePage {...routerProps} />} />
            <Route exact path='/login' render={(routerProps) => <Login {...routerProps} />} />
            <Route exact path='/signup' render={(routerProps) => <SignUp  {...routerProps} />} />
          </Switch>
        </Router>
      </div>
    )
  }
}
