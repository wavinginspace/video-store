import React, { Component } from 'react';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

export class App extends Component {
  state = {
    loggedIn: false
  };

  render() {
    return (
      <div className="App">
        <Header />
        <main className="App-main">
          <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/register'} component={Register} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
