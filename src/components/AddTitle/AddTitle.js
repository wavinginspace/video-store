import React, { Component } from 'react';
import './AddTitle.scss'

export class AddTitle extends Component {
  render() {
    return (
      <div>
        <form>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" required/>
        </form>
      </div>
    );
  }
}

export default AddTitle;
