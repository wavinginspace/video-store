import React, { Component } from 'react';
import ApiContext from '../../ApiContext';
import { Link } from 'react-router-dom';
import CollectionList from '../CollectionList/CollectionList';
import './HomePage.scss';

export class HomePage extends Component {
  static contextType = ApiContext;

  render() {
    return (
      <div className="HomePage">
        <p className="collectionsnumber">
          There are {this.context.films.length} collections in your store
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
