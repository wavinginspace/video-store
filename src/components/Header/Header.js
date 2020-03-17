import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Header.scss';


export class Header extends Component {

  state = {
    loading: true
  }

  componentDidMount() {
    
    this.setState({
      loading: false
    })
  }

  render() {
    if (this.state.loading) {
      return <></>
    }


    return (
      <div className="Header">
        <header>
          <Link to="/" className="homelink">
            <h1>Video Store</h1>
          </Link>
          <p>Welcome to Video Store! Your personal film collection assistant.</p>
        </header>
      </div>
    );
  }
}

export default Header;
