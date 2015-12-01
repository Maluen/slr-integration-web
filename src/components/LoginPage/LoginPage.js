/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './LoginPage.scss';
import { accountStore } from '../../stores/manager';
import LoginError from './LoginError';
import LoginForm from './LoginForm';

@withStyles(styles)
class LoginPage extends Component {

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
    const title = 'Log In';
    this.context.onSetTitle(title);
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
          <h1>{title}</h1>
          <LoginError {...this.state} />
          <LoginForm {...this.state} />
        </div>
      </div>
    );
  }

}

export default LoginPage;
