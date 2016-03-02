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
      <form onSubmit={this.handleSubmit.bind(this)} className="pure-form form-inline">
        <fieldset>
          <input placeholder="Email" type="text" value={this.props.email} onChange={this.handleEmailChange.bind(this)} />
          <input placeholder="Password" type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)} />

          <button type="submit" className="pure-button pure-button-primary">Log In</button>
        </fieldset>
      </form>
    );
  }

}

export default LoginForm;
