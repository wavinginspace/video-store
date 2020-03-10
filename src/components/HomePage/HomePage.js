import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import CollectionList from '../CollectionList/CollectionList';
import './HomePage.scss';

const collections = [
  {
    id: 0,
    title: 'Horror',
  },
  {
    id: 1,
    title: '80s Camp'
  },
  {
    id: 2,
    title: 'Documentaries'
  },
  {
    id: 3, 
    title: 'Foreign Films'
  }
]

export class HomePage extends Component {
  render() {
    return (
      <div className="HomePage">
        <p className="filmnumber">There are {collections.length} collections in your store</p>
        <div className="new-links">
          <Link to="/add-title" className="new-title link">
            Add Title
          </Link>
          <Link to="/add-collection" className="new-collection link">
            Add Collection
          </Link>
        </div>

        <CollectionList collections={collections}/>
      </div>
    );
  }
}

export default HomePage;
