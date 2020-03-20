import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import ApiContext from '../../ApiContext';
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
      fieldTouched: false
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

  generateCollectionsOptions() {
    const { collections = [] } = this.context;
    return collections.map(collection => {
      return (
        <option key={collection.id} id={collection.id} className="collection-option" value={collection.id}>
          {collection.title}
        </option>
      );
    });
  }
  
  updateSelectedCollection(select) {
    let result = [];
    let options = select && select.options;
    let opt;

    for (var i = 0, iLen = options.length; i < iLen; i++) {
      opt = options[i];

      if (opt.selected) {
        result.push(opt.value || opt.text);
      }
    }

    this.setState({
      selected_collections: [...result]
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
          <p className="collections-note">* hold cmd to select multiple collections</p>
          <select
            name="collections"
            id="collections"
            multiple
            size="4"
            value={this.state.selected_collections}
            onChange={e => {
              this.updateSelectedCollection(e.target);
            }}>
            {this.generateCollectionsOptions()}
          </select>

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
            <option value="Blu-ray">Blu-ray</option>
            <option value="Digital">Digital</option>
            <option value="DVD">DVD</option>
            <option value="Other">Other</option>
            <option value="Reel">Reel</option>
            <option value="VHS">VHS</option>
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
            className="input smaller"
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
          <p className="back-button-p">Back Home</p>
        </Link>
      </div>
    );
  }
}

export default AddTitle;
