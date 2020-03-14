import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';
import { findCollection } from '../../services/film-helpers';
import ApiContext from '../../ApiContext';
import config from '../../config';
import './CollectionView.scss';

// const films = [
//   {
//     id: 0,
//     title: 'Last House On The Left'
//   },
//   {
//     id: 1,
//     title: 'Halloween'
//   },
//   {
//     id: 2,
//     title: 'Friday The 13th'
//   },
//   {
//     id: 3,
//     title: 'The Fog'
//   }
// ];

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
    this.setState({
      loading: false
    });

    const collection_id = this.props.match.params.id;

    fetch(`${config.API_ENDPOINT}/api/collections/${collection_id}`).then(
      collection => {
        return collection.json().then(collection => {
          this.setState({
            collection_title: collection.title ? collection.title : '',
            collection_notes: collection.notes ? collection.notes: '',
            collection_films: collection.collection_films ? [...collection.collection_films] : []
          });
        });
      }
    );

    this.setState({
      loading: false
    });
    
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
        this.context.deleteCollection(parseInt(collection_id));
        this.goBack();
      })
      .catch(error => {
        console.log(error.message);
      });
  };

  render() {
    if (this.state.loading) {
      return <></>;
    }

    const { collections = [] } = this.context;
    let { id } = this.props.match.params;

    const collection = findCollection(collections, id) || { content: '' };
    const collectionFilms = this.state.collection_films;

    let numberFilms =
      this.state.collection_films.length === 1
        ? `There is 1 film in this collection.`
        : `There are ${this.state.collection_films.length} films in this collection.`;

    return (
      <>
        <h2>{collection.title}</h2>
        <p className="collection-notes">{collection.notes}</p>
        <p className="filmnumber">{numberFilms}</p>
        <div className="CollectionView box">
          <ul className="film-list" aria-live="polite">
            {collectionFilms.map(film => (
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
        <Link to="/">
          <button>Back</button>
        </Link>
      </>
    );
  }
}

export default CollectionView;
