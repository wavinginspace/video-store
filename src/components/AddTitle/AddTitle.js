import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddTitle.scss';

export class AddTitle extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" required />
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

          <label htmlFor="selling">Selling:</label>
          <input type="checkbox" name="selling" />

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

        <Link to="/">back to collections</Link>
      </div>
    );
  }
}

export default AddTitle;
