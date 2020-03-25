import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import './Header.scss';

export class Header extends Component {
  state = {
    loading: true
  };

  componentDidMount() {
    this.setState({
      loading: false
    });
  }

  static contextType = ApiContext;

  render() {
    const { loggedIn, user } = this.context;

    if (this.state.loading) {
      return <></>;
    }

    return (
      <div className="Header">
        <header>
          <Link to="/" className="homelink">
            <h1>Video Store</h1>
          </Link>
          <p>
            Welcome to Video Store{loggedIn ? `, ${user}` : ''}! Your personal
            film collection assistant.
          </p>
        </header>
      </div>
    );
  }
}

export default Header;
