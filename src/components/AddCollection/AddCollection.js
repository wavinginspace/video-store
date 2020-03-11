import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './AddCollection.scss';

export class AddCollection extends Component {
  render() {
    return (
      <div className="AddCollection">
        <form className="box">
          <label htmlFor="title">Title:</label>
          <input type="text" />
          <label htmlFor="notes">Notes:</label>
          <textarea
            name="notes"
            id="collection-notes"
            cols="30"
            rows="10"></textarea>
          <button type="submit" className="add-collection button">
            Submit
          </button>
        </form>
        <Link to="/">
          <button>Back</button>
        </Link>
      </div>
    );
  }
}

export default AddCollection;
