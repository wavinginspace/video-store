import React, { Component } from 'react';
import './Register.scss';

export class Register extends Component {
  render() {
    return (
      <>
        <h2>Register</h2>

        <div className="Register box">
          <form action="" name="register-form" className="register-form">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email" className="register-input" />

            <label htmlFor="email">Password:</label>
            <input type="password" name="password" className="register-input" />
            <label htmlFor="email">Confirm Password:</label>
            <input
              type="password"
              name="passwordconfirm"
              className="register-input"
            />
            <button type="submit">Submit</button>
          </form>
        </div>
      </>
    );
  }
}

export default Register;
