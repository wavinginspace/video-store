import React, { Component } from 'react';
import './Header.scss'

export class Header extends Component {
  render() {
    return <div className='Header'>
      <header>
        <h1>Video Store</h1>
        <p>Welcome to Video Store! Your personal film collection assistant</p>
      </header>
    </div>;
  }
}

export default Header;
