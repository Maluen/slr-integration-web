/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectAccessCreationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import ProjectAccessForm from '../ProjectAccess/ProjectAccessForm.js';

@withStyles(styles)
@connectToStores
class ProjectAccessCreationPage extends Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    email: PropTypes.string,
    permission: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    email: '',
    permission: 'Administrator',
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.projectAccessCreationActions = this.context.flux.getActions('projectAccessCreationActions');
  }

  static getStores(props, context) {
    return [context.flux.getStore('projectAccessCreationStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('projectAccessCreationStore').getState(),
      projectId: props.projectId,
    };
  }

  handleEmailChange(event) {
    const email = event.currentTarget.value.trim();
    this.projectAccessCreationActions.updateEmail(email);
  }

  handlePermissionChange(event) {
    const permission = event.currentTarget.value.trim();
    this.projectAccessCreationActions.updatePermission(permission);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.projectAccessCreationActions.create(this.props.projectId, this.props.email, this.props.permission);
  }

  render() {
    const title = 'Add access to the project';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectAccessCreationPage">
        <div className="ProjectAccessCreationPage-container">
          <h1>{title}</h1>
          <div>{this.props.errorMessage}</div>
          <ProjectAccessForm
            email={this.props.email}
            permission={this.props.permission}
            onSubmit={this.handleSubmit.bind(this)}
            onEmailChange={this.handleEmailChange.bind(this)}
            onPermissionChange={this.handlePermissionChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default ProjectAccessCreationPage;
