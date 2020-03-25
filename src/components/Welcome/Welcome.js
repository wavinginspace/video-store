import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import './Welcome.scss';

class Welcome extends Component {
  static contextType = ApiContext;
  render() {
    return (
      <div className="fadeIn">
      {/* <img
            className="vcr"
            alt="vcr illustration"
            src={require('../../images/vhs.svg')}
          /> */}
        <nav className="Welcome box">
          <Link to="/login" className="login-link">
            <button className="login button">Login</button>
          </Link>
          <Link to="/register" className="register-link">
            <button className="register button">Register</button>
          </Link>
        </nav>
        <Link
          className="demo-link"
          to="/"
          onClick={this.context.handleDemoLink}>
          Click to demo
        </Link>
      </div>
    );
  }
}

export default Welcome;
