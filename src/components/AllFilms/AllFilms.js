import React, { Component } from 'react';
import FilmLink from '../FilmLink/FilmLink';
import ApiContext from '../../ApiContext';
import '../FilmLink/FilmLink.scss';
import './AllFilms.scss';

export class AllFilms extends Component {
  static contextType = ApiContext;

  render() {
    const { films } = this.props;

    let numberFilms =
      this.context.films.length === 1
        ? `There is 1 film in your store.`
        : `There are ${this.context.films.length} films in your store.`;

    return (
      <>
        <p className="filmnumber fadeIn">{numberFilms}</p>
        <section className="AllFilms fadeIn box">
          <ul>
            {films
              .sort(function(a, b) {
                if (a.title < b.title) {
                  return -1;
                }
                if (a.title > b.title) {
                  return 1;
                }
                return 0;
              })
              .map(film => (
                <FilmLink key={film.id} film={film} />
              ))}
          </ul>
        </section>
      </>
    );
  }
}

export default AllFilms;
