/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectUpdationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import ProjectForm from '../ProjectForm.js';
import projectSettings from '../../../constants/projectSettings';

const defaultSettings = Object.keys(projectSettings).map((settingName) => {
  return { name: settingName, value: projectSettings[settingName].defaultValue };
});

@withStyles(styles)
@connectToStores
class ProjectUpdationPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    settings: PropTypes.array,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    name: '',
    settings: [ ...defaultSettings ],
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.projectUpdationActions = this.context.flux.getActions('projectUpdationActions');
  }

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('projectUpdationStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('projectUpdationStore').fetch(this.props.id);
    }
  }

  componentWillUnmount() {
    this.context.flux.getStore('projectUpdationStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('projectUpdationStore')];
  }

  static getPropsFromStores(props, context) {
    const state = context.flux.getStore('projectUpdationStore').getState();
    return {
      ...state,
      id: props.id, // keep passed id
    };
  }

  handleNameChange(event) {
    const name = event.currentTarget.value.trim();
    this.projectUpdationActions.updateName(name);
  }

  handleSettingsChange(name, value) {
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

    this.projectUpdationActions.updateSettings(settings);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.projectUpdationActions.update(this.props.id, this.props.name, this.props.settings);
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
        <div>{this.props.errorMessage}</div>
        <ProjectForm
          name={this.props.name}
          settings={this.props.settings}
          onSubmit={this.handleSubmit.bind(this)}
          onNameChange={this.handleNameChange.bind(this)}
          onSettingsChange={this.handleSettingsChange.bind(this)}
        />
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
    const title = 'Update project';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectUpdationPage">
        <div className="ProjectUpdationPage-container">
          <h1>{title}</h1>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default ProjectUpdationPage;
