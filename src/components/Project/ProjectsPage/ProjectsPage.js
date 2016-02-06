/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectsPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import ProjectsList from './ProjectsList';

@withStyles(styles)
@connectToStores
class ProjectsPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    projects: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    projects: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('projectsStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('projectsStore').fetch();
    }
  }

  static getStores(props, context) {
    return [context.flux.getStore('projectsStore')];
  }

  static getPropsFromStores(props, context) {
    return context.flux.getStore('projectsStore').getState();
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderFetchError() {
    return <p><b>Load error</b>: {this.props.fetchErrorMessage}</p>;
  }

  renderFetched(el) {
    if (!this.props.isFetched) {
      return this.renderLoading();
    }
    if (this.props.fetchErrorMessage) {
      return this.renderFetchError();
    }
    return el;
  }

  render() {
    const title = 'Projects Manager';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectsPage">
        <div className="ProjectsPage-container">
          <h1>{title}</h1>
          <a className="ProjectsPage-link ProjectsPage-link-createProject" href="/createProject" onClick={Link.handleClick}>Create new</a>
          {this.renderFetched(
            <ProjectsList projects={this.props.projects} />
          )}
        </div>
      </div>
    );
  }

}

export default ProjectsPage;
