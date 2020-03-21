import React, { Component } from 'react';
import CollectionLink from '../CollectionLink/CollectionLink';
import './CollectionList.scss';

export class CollectionList extends Component {
  static defaultProps = {
    collections: []
  };

  render() {
    const { collections } = this.props;

    let alphabetizedCollections = collections.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    

    return (
      <>
        <h2 className="collections-header">Your Collections</h2>
        <section className="CollectionList">
          <ul className="collection-list box" aria-live="polite">
            {alphabetizedCollections.map(collection => (
              <CollectionLink key={collection.id} collection={collection} />
            ))}
          </ul>
        </section>
      </>
    );
  }
}

export default CollectionList;
