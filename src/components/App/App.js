import React, { Component } from 'react';
import config from '../../config';
import Header from '../Header/Header';
import Welcome from '../Welcome/Welcome';
import HomePage from '../HomePage/HomePage';
import Login from '../Login/Login';
import Register from '../Register/Register';
import AddTitle from '../AddTitle/AddTitle';
import AddCollection from '../AddCollection/AddCollection';
import CollectionView from '../CollectionView/CollectionView';
import FilmDetail from '../FilmDetail/FilmDetail';
import AllFilms from '../AllFilms/AllFilms';
import { Route, Switch } from 'react-router-dom';
import './App.scss';
import ApiContext from '../../ApiContext';

export class App extends Component {
  state = {
    loggedIn: true,
    films: [],
    collections: []
  };

  componentDidMount() {
    Promise.all([
      fetch(`${config.API_ENDPOINT}/api/films`),
      fetch(`${config.API_ENDPOINT}/api/collections`)
    ]).then(([filmsRes, collectionsRes]) => {
      if (!filmsRes.ok) return filmsRes.json().then(e => Promise.reject(e));
      if (!collectionsRes.ok)
        return collectionsRes.json().then(e => Promise.reject(e));
      return Promise.all([filmsRes.json(), collectionsRes.json()])
        .then(([films, collections]) => {
          this.setState({ films, collections });
        })
        .catch(error => {});
    });
  }

  handleAddFilm = film => {
    this.setState({
      films: [...this.state.films, film]
    });
  };

  handleDeleteFilm = filmId => {
    this.setState({
      films: this.state.films.filter(film => film.id !== filmId)
    });
  };

  handleAddCollection = collection => {
    this.setState({
      collections: [...this.state.collections, collection]
    });
  };

  handleDeleteCollection = collectionId => {
    console.log(collectionId);
    this.setState({
      collections: this.state.collections.filter(x => x.id !== collectionId)
    })
  };

  render() {
    const value = {
      films: this.state.films,
      collections: this.state.collections,
      deleteFilm: this.handleDeleteFilm,
      deleteCollection: this.handleDeleteCollection,
      addCollection: this.handleAddCollection,
      addFilm: this.handleAddFilm
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <Header />
          <main className="App-main">
            <Switch>
              {this.state.loggedIn ? (
                <Route exact path={'/'} render={props => (
                  <HomePage {...props} films={this.state.films} />
              )}/>) : (
                <Route exact path={'/'} component={Welcome} />
              )}
              <Route exact path={'/login'} component={Login} />
              <Route exact path={'/register'} component={Register} />
              <Route exact path={'/add-title'} component={AddTitle} />
              <Route exact path={'/add-collection'} component={AddCollection} />
              <Route path={'/collections/:id'} component={CollectionView} />
              <Route path={'/films/:id'} component={FilmDetail} />
              <Route
                exact
                path={'/films'}
                render={props => (
                  <AllFilms {...props} films={this.state.films} />
                )}
              />
            </Switch>
          </main>
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
