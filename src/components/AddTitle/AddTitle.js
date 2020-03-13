import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { findCollection } from '../../services/film-helpers';
import config from '../../config';
import ApiContext from '../../ApiContext';
import './AddTitle.scss';

class AddTitle extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      director: '',
      writers: '',
      stars: '',
      selected_collection: '',
      collections: [],
      fieldTouched: false
    };
  }

  static contextType = ApiContext;

  componentDidMount() {
    let selected_collection = this.context.collections[0].title;

    this.setState({
      selected_collection
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
        <option key={collection.id} id={collection.id} value={collection.title}>
          {collection.title}
        </option>
      );
    });
  }

  // TODO this is not updating state correctly.

  updateSelectedCollection(select) {
    const id = parseInt(select[select.selectedIndex].id);
    const title = select[select.selectedIndex].value;

    console.log(id, title, select[0].value);
    const collections = this.state.collections;

    this.setState(
      {
        selected_collection: title
      },
      console.log(this.state)
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    // const date = new Date();

    const { title, selected_collection, director, writers, stars } = this.state;

    const data = {
      title,
      selected_collection,
      director,
      writers,
      stars
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
        console.log(data, this.state);
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
      <div>
        <form className="box" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            onChange={e => this.updateField('title', e.target.value)}
            required
          />
          <label htmlFor="collections">Collections:</label>
          <select
            name="collections"
            id="collections"
            value={this.state.selected_collection}
            onChange={e => {
              this.updateSelectedCollection(e.target);
            }}>
            {this.generateCollectionsOptions()}
          </select>

          <label htmlFor="director">Director:</label>
          <input
            type="text"
            name="director"
            onChange={e => this.updateField('director', e.target.value)}
          />

          <label htmlFor="writers">Writers:</label>
          <input
            type="text"
            name="writers"
            onChange={e => this.updateField('writers', e.target.value)}
          />

          <label htmlFor="stars">Stars:</label>
          <input
            type="text"
            name="stars"
            onChange={e => this.updateField('stars', e.target.value)}
          />

          <label htmlFor="year">Year Released:</label>
          <input type="date" name="year" />

          <label htmlFor="genre">Genre:</label>
          <input type="text" name="genre" />

          <label htmlFor="genre">Format:</label>
          <select name="format" id="format">
            <option value="Blu-ray">Blu-ray</option>
            <option value="Digital">Digital</option>
            <option value="DVD">DVD</option>
            <option value="Other">Other</option>
            <option value="Reel">Reel</option>
            <option value="VHS">VHS</option>
          </select>

          <label htmlFor="version">Version:</label>
          <input type="text" name="version" />

          <label htmlFor="condition">Condition:</label>
          <input type="text" name="condition" />

          <label htmlFor="value">Value:</label>
          <input type="text" name="value" />

          <label htmlFor="rating">Rating:</label>
          <input type="text" name="rating" />

          <div className="sellinginput">
            <label htmlFor="selling" className="sellinglabel">
              Selling:
            </label>
            <input type="checkbox" name="selling" className="sellingcheckbox" />
          </div>

          <label htmlFor="last-watched">Last watched:</label>
          <input type="date" name="last-watched" />

          <label htmlFor="trailer">Trailer:</label>
          <input type="url" name="trailer" />

          <label htmlFor="tags">Tags:</label>
          <input type="text" name="tags" />

          <label htmlFor="notes">Notes:</label>
          <textarea type="text" name="notes" />

          <label htmlFor="memorable-scenes">Memorable Scenes:</label>
          <textarea type="text" name="memorable-scenes" />

          <button type="submit">Submit</button>
        </form>

        <Link to="/" className="homelink">
          <p className="homelinkp">back to collections</p>
        </Link>
      </div>
    );
  }
}

export default AddTitle;
