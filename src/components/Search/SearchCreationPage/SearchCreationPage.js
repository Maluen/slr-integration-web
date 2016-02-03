/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchCreationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import SearchForm from '../SearchForm.js';

@withStyles(styles)
@connectToStores
class SearchCreationPage extends Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
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
    const name = event.currentTarget.value.trim();
    this.searchCreationActions.updateName(name);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.searchCreationActions.create(this.props.projectId, this.props.name);
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
            onSubmit={this.handleSubmit.bind(this)}
            onNameChange={this.handleNameChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default SearchCreationPage;
