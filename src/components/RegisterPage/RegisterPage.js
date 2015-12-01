/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.scss';
import { accountStore } from '../../stores/manager';
import RegisterError from './RegisterError';
import RegisterForm from './RegisterForm';

@withStyles(styles)
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = accountStore.exportState();
  }

  componentDidMount() {
    accountStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    accountStore.removeChangeListener(this._onChange.bind(this));
  }

  // event handler for 'change' events coming from the store
  _onChange() {
    this.setState(accountStore.exportState());
  }

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>
          <RegisterError {...this.state} />
          <RegisterForm {...this.state} />
        </div>
      </div>
    );
  }

}

export default RegisterPage;
