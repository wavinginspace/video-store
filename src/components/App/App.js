import React, { Component } from 'react';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AddTitle from '../AddTitle/AddTitle';
import AddCollection from '../AddCollection/AddCollection';
import CollectionView from '../CollectionView/CollectionView';
import FilmDetail from '../FilmDetail/FilmDetail';
import { Route, Switch } from 'react-router-dom';
import './App.scss';

export class App extends Component {
  state = {
    loggedIn: true
  };

  render() {
    return (
      <div className="App">
        <Header />
        <main className="App-main">
          <Switch>
            {this.state.loggedIn ? (
              <Route exact path={'/'} component={HomePage} />
            ) : (
              <Route exact path={'/'} component={Welcome} />
            )}
            <Route exact path={'/login'} component={Login} />
            <Route exact path={'/register'} component={Register} />
            <Route exact path={'/add-title'} component={AddTitle} />
            <Route exact path={'/add-collection'} component={AddCollection} />
            <Route path={'/collections/:id'} component={CollectionView} />
            <Route path={'/films/:id'} component={FilmDetail} />
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
