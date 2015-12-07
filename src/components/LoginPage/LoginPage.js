/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './LoginPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import LoginError from './LoginError';
import LoginForm from './LoginForm';

@withStyles(styles)
@connectToStores
class LoginPage extends Component {

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

  /*
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

  static stores = [
    accountStore,
  ];
  */

  render() {
    const title = 'Log In';
    this.context.onSetTitle(title);
    return (
      <div className="LoginPage">
        <div className="LoginPage-container">
          <h1>{title}</h1>
          <LoginError {...this.props} />
          <LoginForm {...this.props} />
        </div>
      </div>
    );
  }

}

export default LoginPage;
