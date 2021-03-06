/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchCreationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import SearchForm from '../SearchForm.js';
import searchSettings from '../../../constants/searchSettings';

const defaultSettings = Object.keys(searchSettings).map((settingName) => {
  return { name: settingName, value: searchSettings[settingName].defaultValue };
});

@withStyles(styles)
@connectToStores
class SearchCreationPage extends Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
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

    this.searchCreationActions = this.context.flux.getActions('searchCreationActions');
  }

  static getStores(props, context) {
    return [context.flux.getStore('searchCreationStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('searchCreationStore').getState(),
      projectId: props.projectId,
    };
  }

  handleNameChange(event) {
    const name = event.currentTarget.value;
    this.searchCreationActions.updateName(name);
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

    this.searchCreationActions.updateSettings(settings);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchCreationActions.create(this.props.projectId, this.props.name, this.props.settings);
  }

  render() {
    const title = 'Create new search';
    this.context.onSetTitle(title);
    return (
      <div className="SearchCreationPage">
        <div className="SearchCreationPage-container">
          <h1>{title}</h1>
          <div>{this.props.errorMessage}</div>
          <SearchForm
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

export default SearchCreationPage;
