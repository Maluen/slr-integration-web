/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectsPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';

@withStyles(styles)
@connectToStores
class ProjectsPage extends Component {

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
    const title = 'Projects Manager';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectsPage">
        <div className="ProjectsPage-container">
          <h1>{title}</h1>
        </div>
      </div>
    );
  }

}

export default ProjectsPage;
