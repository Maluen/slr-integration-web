/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { Component } from 'react';
import styles from './Header.scss';
import withStyles from '../../../decorators/withStyles';
import Link from '../../Link';
import Navigation from '../Navigation';

@withStyles(styles)
class Header extends Component {

  render() {
    return (
      <div className="Header">
        <div className="Header-container">
          <a className="Header-brand" href="/" onClick={Link.handleClick}>
            <img className="Header-brandImg" src={require('./disim.png')} width="38" height="36" alt="React" />
            <span className="Header-brandTxt">Home</span>
          </a>
          <Navigation className="Header-nav" />
          <div className="Header-banner">
            <h1 className="Header-bannerTitle">SLR Web</h1>
            <p className="Header-bannerDesc">Web Interface for the SLR Integration tool</p>
          </div>
        </div>
      </div>
    );
  }

}

export default Header;
