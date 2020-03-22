import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import ApiContext from '../../ApiContext';
import Checkbox from '../Checkbox/Checkbox';
import './AddTitle.scss';

class AddTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      selected_collections: [],
      director: '',
      writers: '',
      stars: '',
      year_released: '',
      genre: '',
      film_format: '',
      film_version: '',
      film_condition: '',
      film_value: '',
      film_rating: '',
      selling: false,
      trailer: '',
      tags: '',
      notes: '',
      memorable_scenes: '',
      fieldTouched: false,
      checkedItems: new Map()
    };
  }

  static contextType = ApiContext;

  updateField(field, value) {
    let fieldTouched = `${field}Touched`;
    this.setState({
      [field]: value,
      [fieldTouched]: true
    });
  }

  updateCollections = event => {
    const { target } = event;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      checkedItems: prevState.checkedItems.set(name, value)
    }));

    let selected_collections = this.state.selected_collections;
    let check = target.checked;
    let checked_collection = target.id;

    if (check) {
      this.setState({
        selected_collections: [...selected_collections, checked_collection]
      });
    } else {
      var index = selected_collections.indexOf(checked_collection);
      if (index > -1) {
        selected_collections.splice(index, 1);
        this.setState({
          selected_collections
        });
      }
    }
  };

  generateCollectionsCheckboxes() {
    const { collections = [] } = this.context;
    const alphabetizedCollections = collections.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });

    return alphabetizedCollections.map(collection => {
      return (
        <Checkbox
          key={collection.id}
          id={collection.id}
          type="checkbox"
          name={collection.title}
          checked={this.state.checkedItems.get(collection.name)}
          onChange={this.updateCollections}
        />
      );
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const date_added = new Date();

    const {
      title,
      selected_collections,
      director,
      writers,
      stars,
      year_released,
      genre,
      film_format,
      film_version,
      film_condition,
      film_value,
      film_rating,
      selling,
      trailer,
      tags,
      notes,
      memorable_scenes
    } = this.state;

    const data = {
      title,
      selected_collections,
      director,
      writers,
      stars,
      year_released,
      genre,
      film_format,
      film_version,
      film_condition,
      film_value,
      film_rating,
      selling,
      trailer,
      tags,
      notes,
      memorable_scenes,
      date_added
    };

    fetch(`${config.API_ENDPOINT}/api/films`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('there was an error');
        }
        return res.json();
      })
      .then(data => {
        this.context.addFilm(data);
        this.props.history.push('/');
      })
      .catch(err => {});
  }

  render() {
    return (
      <div className="AddTitle fadeIn">
        <form className="box" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            className="input"
            autoComplete="off"
            onChange={e => this.updateField('title', e.target.value)}
            required
          />
          <label className="collections-label" htmlFor="collections">
            Collections:
          </label>

          <div className="collections-list">
            {this.generateCollectionsCheckboxes()}
          </div>

          <label htmlFor="director">Director:</label>
          <input
            type="text"
            name="director"
            className="input"
            autoComplete="off"
            onChange={e => this.updateField('director', e.target.value)}
          />

          <label htmlFor="writers">Writers:</label>
          <input
            type="text"
            name="writers"
            className="input"
            autoComplete="off"
            onChange={e => this.updateField('writers', e.target.value)}
          />

          <label htmlFor="stars">Stars:</label>
          <input
            type="text"
            name="stars"
            className="input"
            autoComplete="off"
            onChange={e => this.updateField('stars', e.target.value)}
          />

          <label htmlFor="year_released">Year Released:</label>
          <input
            type="text"
            className="input smallest"
            name="year_released"
            autoComplete="off"
            onChange={e => this.updateField('year_released', e.target.value)}
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
            className="input smaller"
            name="genre"
            autoComplete="off"
            onChange={e => this.updateField('genre', e.target.value)}
          />

          <label htmlFor="film_format">Format:</label>
          <select
            name="film_format"
            id="film_format"
            autoComplete="off"
            onChange={e => this.updateField('film_format', e.target.value)}>
            <option value="VHS">VHS</option>
            <option value="Blu-ray">Blu-ray</option>
            <option value="Digital">Digital</option>
            <option value="DVD">DVD</option>
            <option value="Film">Film</option>
            <option value="Other">Other</option>
          </select>

          <label htmlFor="film_version">Version:</label>
          <input
            type="text"
            name="film_version"
            className="input smaller"
            placeholder="Original, Bootleg"
            autoComplete="off"
            onChange={e => this.updateField('film_version', e.target.value)}
          />

          <label htmlFor="film_condition">Condition:</label>
          <input
            type="text"
            name="film_condition"
            className="input smaller"
            autoComplete="off"
            onChange={e => this.updateField('film_condition', e.target.value)}
          />

          <label htmlFor="film_value">Value:</label>
          <input
            type="text"
            name="film_value"
            className="input smallest"
            autoComplete="off"
            onChange={e => this.updateField('film_value', e.target.value)}
          />

          <label htmlFor="film_rating">Rating:</label>
          <input
            type="text"
            name="film_rating"
            className="input smallest"
            placeholder="9/10"
            autoComplete="off"
            onChange={e => this.updateField('film_rating', e.target.value)}
          />

          <div className="sellinginput">
            <label htmlFor="selling" className="sellinglabel">
              Selling:
            </label>
            <input
              type="checkbox"
              name="selling"
              autoComplete="off"
              className="sellingcheckbox"
              onChange={e => this.updateField('selling', e.target.value)}
            />
          </div>

          <label htmlFor="trailer">Trailer:</label>
          <input
            type="url"
            name="trailer"
            className="input trailer"
            placeholder="https://www.youtube.com/watch?v=PYYZFcvQfRg"
            autoComplete="off"
            onChange={e => this.updateField('trailer', e.target.value)}
          />

          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            name="tags"
            className="input"
            autoComplete="off"
            onChange={e => this.updateField('tags', e.target.value)}
          />

          <label htmlFor="notes">Notes:</label>
          <textarea
            type="text"
            name="notes"
            rows="6"
            autoComplete="off"
            onChange={e => this.updateField('notes', e.target.value)}
          />

          <label htmlFor="memorable_scenes">Memorable Scenes:</label>
          <textarea
            type="text"
            rows="6"
            autoComplete="off"
            name="memorable_scenes"
            className="memorable-scenes"
            onChange={e => this.updateField('memorable_scenes', e.target.value)}
          />

          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>

        <Link to="/" className="back-button">
          <p className="back-button-p">Back</p>
        </Link>
      </div>
    );
  }
}

export default AddTitle;
