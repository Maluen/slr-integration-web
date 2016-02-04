/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectCreationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import ProjectForm from '../ProjectForm';
import projectSettings from '../../../constants/projectSettings';

const defaultSettings = Object.keys(projectSettings).map((settingName) => {
  return { name: settingName, value: projectSettings[settingName].defaultValue };
});

@withStyles(styles)
@connectToStores
class ProjectCreationPage extends Component {

  static propTypes = {
    name: PropTypes.string,
    settings: PropTypes.array,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    name: '',
    settings: [ ...defaultSettings ],
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

  handleSettingsChange(event) {
    const name = event.currentTarget.name.trim();
    const value = event.currentTarget.value.trim();

    let found = false;
    const settings = this.props.settings.map(setting => {
      const result = { ...setting };
      if (setting.name === name) {
        result.value = value;
        found = true;
      }
      return result;
    });
    if (!found) {
      settings.push({ name, value });
    }

    this.projectCreationActions.updateSettings(settings);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.projectCreationActions.create(this.props.name, this.props.settings);
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
            settings={this.props.settings}
            onSubmit={this.handleSubmit.bind(this)}
            onNameChange={this.handleNameChange.bind(this)}
            onSettingsChange={this.handleSettingsChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default ProjectCreationPage;
