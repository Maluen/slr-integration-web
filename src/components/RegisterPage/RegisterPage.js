/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import withStyles from '../../decorators/withStyles';
import styles from './RegisterPage.scss';
import { registerStore } from '../../stores/manager';
import RegisterForm from './RegisterForm';

@withStyles(styles)
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  constructor(...args) {
    super(...args);

    this.state = registerStore.exportState();
  }

  componentDidMount() {
    registerStore.addChangeListener(this._onChange.bind(this));
  }

  componentWillUnmount() {
    registerStore.removeChangeListener(this._onChange.bind(this));
  }

  // event handler for 'change' events coming from the store
  _onChange() {
    this.setState(registerStore.exportState());
  }

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>
          <RegisterForm {...this.state} />
        </div>
      </div>
    );
  }

}

export default RegisterPage;
