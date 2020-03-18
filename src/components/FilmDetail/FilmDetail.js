import React from 'react';
import './FilmDetail.scss';
import ApiContext from '../../ApiContext';
import config from '../../config';
import { findFilm } from '../../services/film-helpers';
import { Link } from 'react-router-dom';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  state = {
    collections: '',
    loading: true
  };

  goBack() {
    this.props.history.goBack();
  }

  static defaultProps = {
    match: {
      params: {}
    }
  };

  static contextType = ApiContext;

  componentDidMount() {
    const film_id = this.props.match.params.id;

    fetch(`${config.API_ENDPOINT}/api/films/${film_id}`)
      .then(res => res.json())
      .then(data =>
        this.setState({
          collections: data.collections.split(',').join(', '),
          loading: false
        })
      );
  }

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
        this.goBack();
        this.context.deleteFilm(parseInt(film_id));
      })
      .catch(() => {});
  };

  render() {
    const { films = [] } = this.context;
    let { id } = this.props.match.params;

    const film = findFilm(films, id) || { content: '' };

    if (this.state.loading) {
      return <></>;
    }

    return (
      <>
        <div className="FilmDetail box fadeIn">
          <p>
            <span className="label">Title:</span> {film.title}
          </p>
          <p>
            <span className="label">Collections:</span> {this.state.collections}{' '}
          </p>
          <p>
            <span className="label">Director:</span> {film.director}{' '}
          </p>
          <p>
            <span className="label">Writers:</span> {film.writers}{' '}
          </p>
          <p>
            <span className="label">Stars:</span> {film.stars}{' '}
          </p>
          <p>
            <span className="label">Year:</span> {film.year_released}{' '}
          </p>
          <p>
            <span className="label">Genre:</span> {film.genre}
          </p>
          <p>
            <span className="label">Format:</span> {film.film_format}{' '}
          </p>
          <p>
            <span className="label">Version:</span> {film.film_version}
          </p>
          <p>
            <span className="label">Rating:</span> {film.film_rating}
          </p>
          <p>
            <span className="label">Condition:</span> {film.film_condition}{' '}
          </p>
          <p>
            <span className="label">Value:</span> {film.film_value}{' '}
          </p>
          <p>
            <span className="label">Selling:</span>{' '}
            {film.selling ? 'Yes' : 'No'}
          </p>
          <p>
            <span className="label">Trailer:</span>{' '}
            <a className="trailer-link" href={film.trailer} target="_blank" rel="noopener noreferrer">
              {' '}
              Link{' '}
            </a>
          </p>
          <p>
            <span className="label">Tags:</span> {film.tags}{' '}
          </p>
          <p>
            <span className="label">Notes:</span> {film.notes}{' '}
          </p>
          <p>
            <span className="label">Memorable Scenes:</span>{' '}
            {film.memorable_scenes}
          </p>
          <p>
            <span className="label">Date Added:</span> {film.date_added}
          </p>
          <button
            className="film-delete-button"
            onClick={this.handleClickDelete}
            type="button">
            Delete Film
          </button>
        </div>

        <Link className="back-button" to="/">
          <p className="back-button-p">Back Home</p>
        </Link>
      </>
    );
  }
}

export default FilmDetail;
