import React, { Component } from 'react';
import './Login.scss';
import { Button, Input, Required } from '../Utils/Utils';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import TokenService from '../../services/token-service';
import ApiContext from '../../ApiContext';

export class Login extends Component {
  state = { error: null };

  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  static contextType = ApiContext;

  handleSubmitJwtAuth = ev => {
    ev.preventDefault();
    this.setState({ error: null });
    const { user_name, password } = ev.target;

    AuthApiService.postLogin({
      user_name: user_name.value,
      password: password.value
    })
      .then(res => {
        user_name.value = '';
        password.value = '';
        TokenService.saveAuthToken(res.authToken);
        this.props.onLoginSuccess(res.user_name);
        this.props.history.push('/');
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <form
          className="RegistrationForm box fadeIn"
          onSubmit={this.handleSubmitJwtAuth}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>
          <div className="user_name login-input">
            <label htmlFor="Login__user_name">
              User name <Required />
            </label>
            <Input
              name="user_name"
              type="text"
              autoComplete="off"
              required
              id="Login__user_name"></Input>
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
