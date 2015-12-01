/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class RegisterForm extends Component {

  static propTypes = {
    loginErrorMessage: PropTypes.string,
  };

  static defaultProps = {
    loginErrorMessage: '',
  };

  render() {
    if (this.props.loginErrorMessage === '') return null;

    return (
      <div>{this.props.loginErrorMessage}</div>
    );
  }

}

export default RegisterForm;
