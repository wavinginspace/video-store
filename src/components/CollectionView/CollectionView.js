import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';
import { findCollection } from '../../services/film-helpers';
import ApiContext from '../../ApiContext';
import config from '../../config';
import './CollectionView.scss';

export class CollectionView extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  state = {
    collection_title: '',
    collection_notes: '',
    collection_films: [],
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
    const collection_id = this.props.match.params.id;

    fetch(`${config.API_ENDPOINT}/api/collections/${collection_id}`).then(
      collection => {
        return collection.json().then(collection => {
          this.setState({
            collection_films: collection.collection_films
              ? [...collection.collection_films]
              : [],
            loading: false
          });
        });
      }
    );
  }

  handleClickDelete = e => {
    e.preventDefault();
    const collection_id = this.props.match.params.id;

    fetch(`${config.API_ENDPOINT}/api/collections/${collection_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(() => {
        this.setState({ loading: true });
        this.context.deleteCollection(parseInt(collection_id));
        this.goBack();
      })
      .catch(() => {});
  };

  render() {
    if (this.state.loading) {
      return <></>;
    }

    const { collections = [] } = this.context;
    let { id } = this.props.match.params;

    const collection = findCollection(collections, id) || { content: '' };
    const alphabetizedCollectionFilms = this.state.collection_films.sort(
      function(a, b) {
        if (a.title.toLowerCase() < b.title.toLowerCase()) {
          return -1;
        }
        if (a.title.toLowerCase() > b.title.toLowerCase()) {
          return 1;
        }
        return 0;
      }
    );

    let numberFilms =
      this.state.collection_films.length === 1
        ? `There is 1 film in this collection.`
        : `There are ${this.state.collection_films.length} films in this collection.`;

    return (
      <section className="fadeIn">
        <h2>{collection.title}</h2>
        <p className="collection-notes">{collection.notes}</p>
        <Link to="/add-title" className="new-title link add-view">
          Add Title
        </Link>
        <p className="filmnumber">{numberFilms}</p>
        <div className="CollectionView box">
          <ul className="film-list" aria-live="polite">
            {alphabetizedCollectionFilms.map(film => (
              <FilmLink key={film.id} film={film} />
            ))}
          </ul>
          <button
            className="collection-delete-button"
            onClick={this.handleClickDelete}
            type="button">
            Delete Collection
          </button>
        </div>
        <Link className="back-button" to="/">
          <p className="back-button-p">Back Home</p>
        </Link>
      </section>
    );
  }
}

export default CollectionView;
