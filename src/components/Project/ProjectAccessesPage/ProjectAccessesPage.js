/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectAccessesPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import ProjectAccessesList from './ProjectAccessesList';

@withStyles(styles)
@connectToStores
class ProjectAccessesPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    project: PropTypes.object,
    projectAccesses: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    project: null,
    projectAccesses: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('projectAccessesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('projectAccessesStore').fetch(this.props.projectId);
    }
  }

  componentWillUnmount() {
    this.context.flux.getStore('projectAccessesStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('projectAccessesStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('projectAccessesStore').getState(),
      projectId: props.projectId,
    };
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderFetchError() {
    return <p><b>Load error</b>: {this.props.fetchErrorMessage}</p>;
  }

  renderFetchSuccess() {
    return (
      <div>
        <h2>Project {this.props.project.name}</h2>
        <a className="ProjectAccessesPage-link ProjectAccessesPage-link-createProjectAccess"
          href={`/createProjectAccess/${this.props.projectId}`}
          onClick={Link.handleClick}>
          Add access
        </a>
        <ProjectAccessesList projectAccesses={this.props.projectAccesses} />
      </div>
    );
  }

  renderFetch() {
    if (!this.props.isFetched) {
      return this.renderLoading();
    }
    if (this.props.fetchErrorMessage) {
      return this.renderFetchError();
    }
    return this.renderFetchSuccess();
  }

  render() {
    const title = 'Project Users';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectAccessesPage">
        <div className="ProjectAccessesPage-container">
          <h1>{title}</h1>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default ProjectAccessesPage;
