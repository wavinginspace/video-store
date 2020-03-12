import React, { Component } from 'react';
import FilmLink from '../FilmLink/FilmLink'
import '../FilmLink/FilmLink.scss'
import './AllFilms.scss';

export class AllFilms extends Component {

  render() {
    const { films } = this.props;
    return (
      <div className="AllFilms box">
        <ul>
          {films.map(film => (
            <FilmLink key={film.id} film={film} />
          ))}
        </ul>
      </div>
    );
  }
}

export default AllFilms;
