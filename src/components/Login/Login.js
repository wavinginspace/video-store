import React, { Component } from 'react';
import './Login.scss';

export class Login extends Component {
  render() {
    return (
      <>
        <div className="Login box">
          <form action="" name="login-form" className="login-form">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="login-input" />

            <label htmlFor="email">Password:</label>
            <input
              type="password"
              name="loginpassword"
              className="login-input"
            />
            <button type="submit" className="login button">
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default Login;
