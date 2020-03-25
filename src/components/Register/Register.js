import React, { Component } from 'react';
import { Button, Input, Required } from '../Utils/Utils';
import { Link } from 'react-router-dom';
import ApiContext from '../../ApiContext';
import AuthApiService from '../../services/auth-api-service';
import './Register.scss';

class Register extends Component {
  constructor(props) {
    super(props);
    this.goBack = this.goBack.bind(this);
  }

  goBack() {
    this.props.history.goBack();
  }

  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  static contextType = ApiContext;

  state = { error: null };

  handleSubmit = ev => {
    ev.preventDefault();
    const { user_name, password } = ev.target;

    this.setState({ error: null });
    AuthApiService.postUser({
      user_name: user_name.value,
      password: password.value
    })
      .then(user => {
        user_name.value = '';
        password.value = '';
        this.context.handleRegistrationSuccess(user.user_name);
        this.props.history.goBack();
      })
      .catch(res => {
        this.setState({ error: res.error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <>
        <form className="RegistrationForm box fadeIn" onSubmit={this.handleSubmit}>
          <div role="alert">{error && <p className="red">{error}</p>}</div>

          <div className="user_name register-input">
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
          <div className="password register-input">
            <label htmlFor="RegistrationForm__password">
              Password <Required />
            </label>
            <Input
              name="password"
              type="password"
              autoComplete="off"
              required
              id="RegistrationForm__password"></Input>
          </div>
          {/* <div className="password2 register-input">
            <label htmlFor="RegistrationForm__password2">
              Re-enter Password <Required />
            </label>
            <Input
              name="password2"
              type="password"
              autoComplete="off"
              required
              id="RegistrationForm__password2"></Input>
          </div> */}

          <Button className=" register-button submit-button" type="submit">
            Register
          </Button>
        </form>

        <Link className="back-button" to="/">
          <p className="back-button-p">Back</p>
        </Link>
      </>
    );
  }
}

export default Register;
