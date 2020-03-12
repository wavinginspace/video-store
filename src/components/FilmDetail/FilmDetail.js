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
          <p>Collections: </p>
          <p>Director: </p>
          <p>Writers: </p>
          <p>Stars: </p>
          <p>Year: </p>
          <p>Genre: </p>
          <p>Format: </p>
          <p>Version: </p>
          <p>Rating: </p>
          <p>Condition: </p>
          <p>Value: </p>
          <p>Selling: </p>
          <p>Last Watched: </p>
          <p>Trailer: </p>
          <p>Tags: </p>
          <p>Notes: </p>
          <p>Memorable Scenes: </p>
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
