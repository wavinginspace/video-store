import React from 'react';
import './FilmDetail.scss';
import ApiContext from '../../ApiContext';
import config from '../../config';
import { findFilm } from '../../services/film-helpers';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = ApiContext;

  handleClickDelete = e => {
    e.preventDefault();
    const film_id = this.props.match.params.id;

    fetch(`${config.API_ENDPOINT}/api/films/${film_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => {
        this.context.deleteFilm(parseInt(film_id));
        this.goBack();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    const { films = [] } = this.context;
    let { id } = this.props.match.params;

    const film = findFilm(films, id) || { content: '' };

    return (
      <>
        <div className="FilmDetail box">
          <p>Title: {film.title}</p>
          <p>Collections: {film.collections} </p>
          <p>Director: {film.director} </p>
          <p>Writers: {film.writers} </p>
          <p>Stars: {film.stars} </p>
          <p>Year: {film.year_released} </p>
          <p>Genre: {film.genre}</p>
          <p>Format: {film.film_format} </p>
          <p>Version: {film.film_version}</p>
          <p>Rating: {film.film_rating}</p>
          <p>Condition: {film.film_condition} </p>
          <p>Value: {film.film_value} </p>
          <p>Selling: {film.selling ? 'yes' : 'no'}</p>
          <p>Last Watched: {film.last_watched} </p>
          <p>
            Trailer:
            <a href={film.trailer} target="_blank" rel="noopener noreferrer">
              Watch here
            </a>
          </p>
          <p>Tags: {film.tags} </p>
          <p>Notes: {film.notes} </p>
          <p>Memorable Scenes: {film.memorable_scenes}</p>
          <p>Date Added: {film.date_added}</p>
          <button
            className="film-delete-button"
            onClick={this.handleClickDelete}
            type="button">
            Delete
          </button>
        </div>

        <button onClick={this.goBack}>Back</button>
      </>
    );
  }
}

export default FilmDetail;
