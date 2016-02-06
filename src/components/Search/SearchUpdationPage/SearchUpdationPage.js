/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchUpdationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import SearchForm from '../SearchForm.js';
import searchSettings from '../../../constants/searchSettings';

const defaultSettings = Object.keys(searchSettings).map((settingName) => {
  return { name: settingName, value: searchSettings[settingName].defaultValue };
});

@withStyles(styles)
@connectToStores
class SearchUpdationPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    projectId: PropTypes.string.isRequired,
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

    this.searchUpdationActions = this.context.flux.getActions('searchUpdationActions');
  }

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchUpdationStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('searchUpdationStore').fetch(this.props.projectId, this.props.id);
    }
  }

  componentWillUnmount() {
    this.context.flux.getStore('searchUpdationStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('searchUpdationStore')];
  }

  static getPropsFromStores(props, context) {
    const state = context.flux.getStore('searchUpdationStore').getState();
    return {
      ...state,
      projectId: props.projectId, // keep passed projectId
      id: props.id, // keep passed id
    };
  }

  handleNameChange(event) {
    const name = event.currentTarget.value.trim();
    this.searchUpdationActions.updateName(name);
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

    this.searchUpdationActions.updateSettings(settings);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchUpdationActions.update(this.props.projectId, this.props.id, this.props.name, this.props.settings);
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
        <SearchForm
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
    const title = 'Update search';
    this.context.onSetTitle(title);
    return (
      <div className="SearchUpdationPage">
        <div className="SearchUpdationPage-container">
          <h1>{title}</h1>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default SearchUpdationPage;
