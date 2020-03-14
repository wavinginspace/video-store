import React from 'react';
import { Link } from 'react-router-dom';
import './FilmLink.scss';

function FilmLink(props) {
  const { film } = props;
  return (
    <Link to={`/films/${film.id}`} className="film-link" title={film}>
      <li className="FilmLink" title={film}>
        {film}
      </li>
    </Link>
  );
}

export default FilmLink;
