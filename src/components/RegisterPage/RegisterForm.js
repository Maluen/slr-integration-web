/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import { registerActions } from '../../actions/manager';

class RegisterForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
  };

  static defaultProps = {
    email: '',
    password: '',
  };

  handleEmailChange = (event) => {
    const email = event.currentTarget.value.trim();
    registerActions.updateEmail(email);
  };

  handlePasswordChange = (event) => {
    const password = event.currentTarget.value.trim();
    registerActions.updatePassword(password);
  };

  handleSubmit = (event) => {
    event.preventDefault();
    registerActions.register(this.props.email, this.props.password);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>
          <label>Email</label>
          <input type="text" value={this.props.email} onChange={this.handleEmailChange} />
        </p>

        <p>
          <label>Password</label>
          <input type="password" value={this.props.password} onChange={this.handlePasswordChange} />
        </p>

        <input type="submit" value="Register" />
      </form>
    );
  }

}

export default RegisterForm;
