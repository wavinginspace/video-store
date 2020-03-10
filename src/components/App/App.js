import React, { Component } from 'react';
import Header from '../Header/Header'
import { Route, Switch } from 'react-router-dom';
import './App.css';

export class App extends Component {
  render() {
    return (
      <div className='App'>
        <Header />
        
      </div>
    );
  }
}

export default App;
