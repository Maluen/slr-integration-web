/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class RegisterForm extends Component {

  static propTypes = {
    registerErrorMessage: PropTypes.string,
  };

  static defaultProps = {
    registerErrorMessage: '',
  };

  render() {
    if (this.props.registerErrorMessage === '') return null;

    return (
      <div>{this.props.registerErrorMessage}</div>
    );
  }

}

export default RegisterForm;
