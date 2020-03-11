import React from 'react';
import { Link } from 'react-router-dom';
import './FilmLink.scss';

function FilmLink(props) {
  return (
    <Link to={`/films/${props.film.id}`} className="film-link" title={props.film.title}>
      <li className="FilmLink" title={props.film.title}>
        {props.film.title}
      </li>
    </Link>
  );
}

export default FilmLink;
