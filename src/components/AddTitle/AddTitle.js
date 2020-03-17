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

  componentDidMount() {
    this.setState({
      selected_collections: this.context.collections[0].title
    });
  }

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
        <option key={collection.id} id={collection.id} value={collection.id}>
          {collection.title}
        </option>
      );
    });
  }

  // TODO this is not updating state correctly.

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

    const dropdownStyle = {
      fontFamily: 'monospace'
    }

    return (
      <div className="AddTitle fadeIn">
        <form className="box" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            onChange={e => this.updateField('title', e.target.value)}
            required
          />
          <label className="collections-label" htmlFor="collections">Collections:</label>
          <select
            name="collections"
            id="collections"
            multiple
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
            autoComplete="off"
            onChange={e => this.updateField('director', e.target.value)}
          />

          <label htmlFor="writers">Writers:</label>
          <input
            type="text"
            name="writers"
            autoComplete="off"
            onChange={e => this.updateField('writers', e.target.value)}
          />

          <label htmlFor="stars">Stars:</label>
          <input
            type="text"
            name="stars"
            autoComplete="off"
            onChange={e => this.updateField('stars', e.target.value)}
          />

          <label htmlFor="year_released">Year Released:</label>
          <input
            type="text"
            name="year_released"
            autoComplete="off"
            onChange={e => this.updateField('year_released', e.target.value)}
          />

          <label htmlFor="genre">Genre:</label>
          <input
            type="text"
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
            autoComplete="off"
            onChange={e => this.updateField('film_version', e.target.value)}
          />

          <label htmlFor="film_condition">Condition:</label>
          <input
            type="text"
            name="film_condition"
            autoComplete="off"
            onChange={e => this.updateField('film_condition', e.target.value)}
          />

          <label htmlFor="film_value">Value:</label>
          <input
            type="text"
            name="film_value"
            autoComplete="off"
            onChange={e => this.updateField('film_value', e.target.value)}
          />

          <label htmlFor="film_rating">Rating:</label>
          <input
            type="text"
            name="film_rating"
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
            autoComplete="off"
            onChange={e => this.updateField('trailer', e.target.value)}
          />

          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            name="tags"
            autoComplete="off"
            onChange={e => this.updateField('tags', e.target.value)}
          />

          <label htmlFor="notes">Notes:</label>
          <textarea
            type="text"
            name="notes"
            autoComplete="off"
            onChange={e => this.updateField('notes', e.target.value)}
          />

          <label htmlFor="memorable_scenes">Memorable Scenes:</label>
          <textarea
            type="text"
            autoComplete="off"
            name="memorable_scenes"
            onChange={e => this.updateField('memorable_scenes', e.target.value)}
          />

          <button className="submit-button" type="submit">Submit</button>
        </form>

        <Link to="/" className="homelink">
          <p className="homelinkp">back to collections</p>
        </Link>
      </div>
    );
  }
}

export default AddTitle;
