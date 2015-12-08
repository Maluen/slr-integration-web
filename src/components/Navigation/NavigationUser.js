/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class NavigationUser extends Component {

  static propTypes = {
    user: PropTypes.object,
  };

  render() {
    if (this.props.user.isAuthenticated) {
      return (
        <span className="User-nav Navigation">
          <a className="Navigation-link" href="/logout" onClick={Link.handleClick}>Log out</a>
        </span>
      );
    }
    return (
      <span className="User-nav Navigation">
        <a className="Navigation-link" href="/login" onClick={Link.handleClick}>Log in</a>
        <span className="Navigation-spacer">or</span>
        <a className="Navigation-link Navigation-link--highlight" href="/register" onClick={Link.handleClick}>Sign up</a>
      </span>
    );
  }

}

export default NavigationUser;
