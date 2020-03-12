import React, { Component } from 'react';
import FilmLink from '../FilmLink/FilmLink'
import '../FilmLink/FilmLink.scss'
import './AllFilms.scss';
import config from '../../config';

export class AllFilms extends Component {
  // componentDidMount() {
  //   fetch(`${config.API_ENDPOINT}/api/films`)
  // }

  render() {
    const { films } = this.props;
    return (
      <div>
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
