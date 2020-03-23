import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilmLink from '../FilmLink/FilmLink';
import Checkbox from '../Checkbox/Checkbox';
import ApiContext from '../../ApiContext';
import '../FilmLink/FilmLink.scss';
import './AllFilms.scss';

export class AllFilms extends Component {
  state = {
    selling_checked: false
  };

  static contextType = ApiContext;

  handleCheckboxChange(field, value) {
    this.setState({
      [field]: value
    });
  }

  render() {
    const { films } = this.props;

    let alphabetizedFilms = films.sort(function(a, b) {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    let filteredFilms;

    this.state.selling_checked
      ? (filteredFilms = alphabetizedFilms.filter(film => film.selling === 'true'))
      : (filteredFilms = alphabetizedFilms);

    let numberFilms =
      this.context.films.length === 1
        ? `There is 1 film in your store.`
        : `There are ${this.context.films.length} films in your store.`;

    // let saleAmount = this.state.selling_checked ? <span className="sale-amount"></span>

    return (
      <section className="AllFilms fadeIn">
        <p className="filmnumber fadeIn">{numberFilms}</p>
        
        <div className="box">
        <div className="filter-checkboxes">
          <Checkbox
            className="selling-checkbox"
            type="checkbox"
            name="selling: "
            checked={this.state.selling_checked}
            onChange={e =>
              this.handleCheckboxChange('selling_checked', e.target.checked)
            }
          />
        </div>
          <ul>
            {filteredFilms.map(film => (
              <FilmLink key={film.id} film={film} selling={this.state.selling_checked} />
            ))
            }
          </ul>
        </div>
        <Link className="back-button" to="/">
          <p className="back-button-p">Back</p>
        </Link>
      </section>
    );
  }
}

export default AllFilms;
