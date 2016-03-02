/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class RegisterForm extends Component {

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
    this.accountActions.register(this.props.email, this.props.password);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit.bind(this)} className="pure-form pure-form-stacked">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="text" value={this.props.email} onChange={this.handleEmailChange.bind(this)} />
          </div>

          <div className="pure-control-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={this.props.password} onChange={this.handlePasswordChange.bind(this)} />
          </div>
        </fieldset>

        <button type="submit" className="pure-button pure-button-primary">Register</button>
      </form>
    );
  }

}

export default RegisterForm;
