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
    const { loggedIn, user, handleLogOut } = this.context;

    let welcomeMessage =
      loggedIn && user !== 'Guest'
        ? `Welcome to Video Store, ${user}!`
        : `Welcome to Video Store! Your personal film collection assistant.`;

    let logStatus = user == 'Guest' ? 'Login/Register' : 'Logout';



    if (this.state.loading) {
      return <></>;
    }

    return (
      <div className="Header">
        {loggedIn ? (
          <Link className="log-button" to="/" onClick={handleLogOut}>
            <p className="log-button">{logStatus}</p>
          </Link>
        ) : (
          ''
        )}
        <header>
          <Link to="/" className="homelink">
            <h1>Video Store</h1>
          </Link>
          <p className="welcome-message">{welcomeMessage}</p>
        </header>
      </div>
    );
  }
}

export default Header;
