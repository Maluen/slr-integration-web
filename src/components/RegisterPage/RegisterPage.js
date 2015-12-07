/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './RegisterPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import RegisterError from './RegisterError';
import RegisterForm from './RegisterForm';

@withStyles(styles)
@connectToStores
class RegisterPage extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static getStores(props, context) {
    return [context.flux.getStore('accountStore')];
  }

  static getPropsFromStores(props, context) {
    return context.flux.getStore('accountStore').getState();
  }

  render() {
    const title = 'New User Registration';
    this.context.onSetTitle(title);
    return (
      <div className="RegisterPage">
        <div className="RegisterPage-container">
          <h1>{title}</h1>
          <RegisterError {...this.props} />
          <RegisterForm {...this.props} />
        </div>
      </div>
    );
  }

}

export default RegisterPage;
