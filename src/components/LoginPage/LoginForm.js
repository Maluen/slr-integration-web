/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class LoginForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    password: PropTypes.string,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    email: '',
    password: '',
  };

  constructor(...args) {
    super(...args);

    this.accountActions = this.context.flux.getActions('accountActions');
  }

  handleEmailChange(event) {
    const email = event.currentTarget.value.trim();
    this.accountActions.updateEmail(email);
  }

  handlePasswordChange(event) {
    const password = event.currentTarget.value.trim();
    this.accountActions.updatePassword(password);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.accountActions.login(this.props.email, this.props.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)}>
        <p>
          <label>Email</label>
          <input type="text" value={this.props.email} onChange={this.handleEmailChange.bind(this)} />
        </p>

        <p>
          <label>Password</label>
          <input type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)} />
        </p>

        <input type="submit" value="Login" />
      </form>
    );
  }

}

export default LoginForm;
