import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Collection.scss';

function Collection(props) {
  return (
    <Link to={`/collections/${props.collection.id}`} className="collection-link">
      <li className="Collection">{props.collection.title}</li>
    </Link>
  );
}

export default Collection;
