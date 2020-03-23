import React from 'react';
import { Link } from 'react-router-dom';
import './FilmLink.scss';

function FilmLink(props) {
  const { film, selling } = props;
  return (
    <Link to={`/films/${film.id}`} className="film-link" title={film.title}>
      <li className="FilmLink" title={film.title}>
        {film.title} {selling ? <span className="sale-amount"> - {film.film_value}</span>: ''}
      </li>
    </Link>
  );
}

export default FilmLink;
