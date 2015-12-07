/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import classNames from 'classnames';
import styles from './Navigation.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../Link';

@withStyles(styles)
@connectToStores
class Navigation extends Component {

  static propTypes = {
    className: PropTypes.string,
    user: PropTypes.object,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  static getStores(props, context) {
    return [context.flux.getStore('accountStore')];
  }

  static getPropsFromStores(props, context) {
    return { user: context.flux.getStore('accountStore').getState() };
  }

  renderUserNav() {
    if (this.props.user.isAuthenticated) {
      return (
        <div className="User-nav Navigation">
          <a className="Navigation-link" href="/logout" onClick={Link.handleClick}>Log out</a>
        </div>
      );
    }
    return (
      <div className="User-nav Navigation">
        <a className="Navigation-link" href="/login" onClick={Link.handleClick}>Log in</a>
        <span className="Navigation-spacer">or</span>
        <a className="Navigation-link Navigation-link--highlight" href="/register" onClick={Link.handleClick}>Sign up</a>
      </div>
    );
  }

  render() {
    return (
      <div className={classNames(this.props.className, 'Navigation')} role="navigation">
        <a className="Navigation-link" href="/about" onClick={Link.handleClick}>About</a>
        <a className="Navigation-link" href="/contact" onClick={Link.handleClick}>Contact</a>
        <span className="Navigation-spacer"> | </span>
        {this.renderUserNav()}
      </div>
    );
  }

}

export default Navigation;
