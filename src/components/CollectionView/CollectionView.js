import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';
import ApiContext from '../../ApiContext';
import config from '../../config';
import './CollectionView.scss';

const films = [
  {
    id: 0,
    title: 'Last House On The Left'
  },
  {
    id: 1,
    title: 'Halloween'
  },
  {
    id: 2,
    title: 'Friday The 13th'
  },
  {
    id: 3,
    title: 'The Fog'
  }
];

export class CollectionView extends Component {
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
    // const { title } = this.props.match.params.id;
    return (
      <>
        {/* <h2>{this.props.collection.title}</h2> */}
        <p className="filmnumber">
          There are {films.length} films in this collection.
        </p>
        <div className="CollectionView box">
          <ul className="film-list" aria-live="polite">
            {films.map(film => (
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
