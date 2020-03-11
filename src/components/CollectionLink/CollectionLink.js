import React from 'react';
import { Link } from 'react-router-dom';
import './CollectionLink.scss';

function CollectionLink(props) {
  return (
    <Link to={`/collections/${props.collection.id}`} className="collection-link">
      <li className="CollectionLink">{props.collection.title}</li>
    </Link>
  );
}

export default CollectionLink;
