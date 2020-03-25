import React, { Component } from 'react';
import './Login.scss';
import { Button, Input, Required } from '../Utils/Utils';
import { Link } from 'react-router-dom';

export class Login extends Component {

  state = { error: null };

  render() {
    const { error } = this.state;
    return (
      <>
        <form className="RegistrationForm box fadeIn" onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>

          <div className="user_name login-input">
            <label htmlFor="RegistrationForm__user_name">
              User name <Required />
            </label>
            <Input
              name="user_name"
              type="text"
              autoComplete="off"
              required
              id="RegistrationForm__user_name"></Input>
          </div>
          <div className="password login-input">
            <label htmlFor="Login__password">
              Password <Required />
            </label>
            <Input
              name="password"
              type="password"
              autoComplete="off"
              required
              id="Login__password"></Input>
          </div>
          {/* <div className="password2 register-input">
            <label htmlFor="Login__password2">
              Re-enter Password <Required />
            </label>
            <Input
              name="password2"
              type="password"
              autoComplete="off"
              required
              id="Login__password2"></Input>
          </div> */}

          <Button className=" register-button submit-button" type="submit">
            Login
          </Button>
        </form>

        <Link className="back-button" to="/">
          <p className="back-button-p">Back</p>
        </Link>
      </>
    );
  }
}

export default Login;
