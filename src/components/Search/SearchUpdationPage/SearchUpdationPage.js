/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchUpdationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import SearchForm from '../SearchForm.js';

@withStyles(styles)
@connectToStores
class SearchCreationPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    name: '',
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
      this.context.flux.getActions('searchUpdationActions').fetch(this.props.projectId, this.props.id);
    }
  }

  componentWillUnmount() {
    this.searchUpdationActions.reset();
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

  handleSubmit(event) {
    event.preventDefault();
    this.searchUpdationActions.update(this.props.projectId, this.props.id, this.props.name);
  }

  render() {
    const title = 'Update search';
    this.context.onSetTitle(title);
    return (
      <div className="SearchUpdationPage">
        <div className="SearchUpdationPage-container">
          <h1>{title}</h1>
          {this.props.isFetched ?
            <div>
              <div>{this.props.errorMessage}</div>
              <SearchForm
                name={this.props.name}
                onSubmit={this.handleSubmit.bind(this)}
                onNameChange={this.handleNameChange.bind(this)}
              />
            </div>
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default SearchCreationPage;
