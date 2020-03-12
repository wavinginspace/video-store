import React from 'react';
import './FilmDetail.scss';

class FilmDetail extends React.Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  render() {
    return (
      <>
        <div className="FilmDetail box">
          <p>Title: </p>
          <p>Collections: </p>
          <p>Director: </p>
          <p>Writers: </p>
          <p>Stars: </p>
          <p>Year: </p>
          <p>Genre: </p>
          <p>Format: </p>
          <p>Version: </p>
          <p>Rating: </p>
          <p>Condition: </p>
          <p>Value: </p>
          <p>Selling: </p>
          <p>Last Watched: </p>
          <p>Trailer: </p>
          <p>Tags: </p>
          <p>Notes: </p>
          <p>Memorable Scenes: </p>
        </div>

        <button onClick={this.goBack}>Back</button>
      </>
    );
  }
}

export default FilmDetail;
