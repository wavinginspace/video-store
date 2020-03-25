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

    let welcomeMessage = loggedIn && user !== 'Guest' ? `Welcome to Video Store, ${user}!` :
    `Welcome to Video Store! Your personal film collection assistant.`

    if (this.state.loading) {
      return <></>;
    }

    return (
      <div className="Header">
        <header>
        
          <Link to="/" className="homelink">
            <h1>Video Store</h1>
          </Link>
          <p className="welcome-message">
            {welcomeMessage}
          </p>
          <Link to="/films" className="all-films-link">
          <p className="all-films-link-p">View all films</p>
        </Link>
        </header>
      </div>
    );
  }
}

export default Header;
