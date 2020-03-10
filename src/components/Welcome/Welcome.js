import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "./Welcome.scss"

class Welcome extends Component {
  render() {
    return (
      <nav className="Welcome box">
        <Link to="/login">
          <button className="welcome button">Login</button>
        </Link>
        <Link to="/register">
          <button className="welcome button">Register</button>
        </Link>
      </nav>
    );
  }
}

export default Welcome;
