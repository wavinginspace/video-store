import React from 'react';
import { Link } from 'react-router-dom';
import './CollectionLink.scss';

function CollectionLink(props) {
  return (
    <li className="CollectionLink">
      <Link
        to={`/collections/${props.collection.id}`}
        className="collection-link">
        {props.collection.title}
      </Link>
    </li>
  );
}

export default CollectionLink;
