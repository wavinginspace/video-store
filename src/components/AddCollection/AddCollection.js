import React, { Component } from 'react';
import ApiContext from '../../ApiContext';
import config from '../../config';
import { Link } from 'react-router-dom';
import './AddCollection.scss';

class AddCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      notes: '',
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

  handleSubmit(event) {
    event.preventDefault();
    // const date = new Date();
    const { title, notes } = this.state;

    const data = {
      title,
      notes
    };

    fetch(`${config.API_ENDPOINT}/api/collections`, {
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
        this.context.addCollection(data);
        this.props.history.push('/');
      })
      .catch(err => {});
  }

  render() {
    return (
      <div className="AddCollection fadeIn">
        <form className="box" onSubmit={e => this.handleSubmit(e)}>
          <label htmlFor="title">Title:</label>
          <input type="text" name="title" autoComplete="off" onChange={e => this.updateField('title', e.target.value)}/>
          <label htmlFor="notes">Notes:</label>
          <textarea
            name="notes"
            id="collection-notes"
            cols="30"
            rows="10"
            onChange={e => this.updateField('notes', e.target.value)}></textarea>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <Link className="back-button" to="/">
          <p className="back-button-p">Back</p>
        </Link>
      </div>
    );
  }
}

export default AddCollection;
