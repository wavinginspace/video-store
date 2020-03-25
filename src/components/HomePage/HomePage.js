import React, { Component } from 'react';
import ApiContext from '../../ApiContext';
import { Link } from 'react-router-dom';
import CollectionList from '../CollectionList/CollectionList';
import './HomePage.scss';

export class HomePage extends Component {
  static contextType = ApiContext;

  render() {
    const { handleLogOut } = this.context;
    let numberFilms =
      this.context.films.length === 1
        ? `There is 1 film and `
        : `There are ${this.context.films.length} films and `;

    let numberCollections =
      this.context.collections.length === 1
        ? `1 collection in your store`
        : `${this.context.collections.length} collections in your store.`;

    return (
      <div className="HomePage fadeIn">
        <Link to="/films">
          <img
            className="vcr"
            alt="vcr illustration"
            src={require('../../images/vhs.svg')}
          />
        </Link>

        <p className="storecount">
          {numberFilms}
          {numberCollections}
        </p>

        <div className="new-links">
          <Link to="/add-title" className="new-title link">
            Add Title
          </Link>
          <Link to="/add-collection" className="new-collection link">
            Add Collection
          </Link>
        </div>

        <CollectionList collections={this.context.collections} />
        <Link to="/films" className="all-films-link">
          <p className="all-films-link-p">View all films</p>
        </Link>
      </div>
    );
  }
}

export default HomePage;
