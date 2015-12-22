/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectCreationPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import ProjectForm from '../Project/ProjectForm.js';

@withStyles(styles)
@connectToStores
class ProjectCreationPage extends Component {

  static propTypes = {
    name: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    name: '',
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.projectCreationActions = this.context.flux.getActions('projectCreationActions');
  }

  static getStores(props, context) {
    return [context.flux.getStore('projectCreationStore')];
  }

  static getPropsFromStores(props, context) {
    return context.flux.getStore('projectCreationStore').getState();
  }

  handleNameChange(event) {
    const name = event.currentTarget.value.trim();
    this.projectCreationActions.updateName(name);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.projectCreationActions.create(this.props.name);
  }

  render() {
    const title = 'Create new project';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectCreationPage">
        <div className="ProjectCreationPage-container">
          <h1>{title}</h1>
          <div>{this.props.errorMessage}</div>
          <ProjectForm
            name={this.props.name}
            onSubmit={this.handleSubmit.bind(this)}
            onNameChange={this.handleNameChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default ProjectCreationPage;
