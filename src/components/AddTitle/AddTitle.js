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
      selectedCollection: '',
      collections: [],
      titleTouched: false,
      contentTouched: false
    };
  }

  static contextType = ApiContext;

  updateField(field, value) {
    this.setState({
      [field]: value,
      titleTouched: true
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    // const date = new Date();
    const { title } = this.state;

    const data = {
      title
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
          <select type="text" name="collections" id="collections" multiple>
            <option value="">Collection 1</option>
            <option value="">Collection 2</option>
            <option value="">Collection 3</option>
            <option value="">Collection 4</option>
          </select>

          <label htmlFor="director">Director:</label>
          <input type="text" name="director" />

          <label htmlFor="writers">Writers:</label>
          <input type="text" name="writers" />

          <label htmlFor="stars">Stars:</label>
          <input type="text" name="stars" />

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
