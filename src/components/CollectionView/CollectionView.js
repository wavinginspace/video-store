import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';
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
  static defaultProps = {
    films: []
  };

  render() {
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
        </div>
        <Link to="/">
          <button>Back</button>
        </Link>
      </>
    );
  }
}

export default CollectionView;
