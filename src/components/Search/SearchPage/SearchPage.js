/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import SearchMachinesList from './SearchMachinesList';
import Globals from '../../../core/Globals';

@withStyles(styles)
@connectToStores
class SearchPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    machineId: PropTypes.string,
    state: PropTypes.object,
    startSearchErrorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    startSearchErrorMessage: '',
  };

  async componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchStore').getState();
    if (!isFetched && !isFetching) {
      try {
        await this.context.flux.getStore('searchStore').fetch(this.props.projectId, this.props.id);
        this.listenToSearch();
      } catch (err) {
        // no-op
      }
    } else {
      // already fetched
      this.listenToSearch();
    }
  }

  componentWillUnmount() {
    Globals.webSocketClient.stopListeningToSearch(this.props.id);
    this.context.flux.getStore('searchStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('searchStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('searchStore').getState(),
      projectId: props.projectId,
      id: props.id,
    };
  }

  listenToSearch() {
    Globals.webSocketClient.listenToSearch(this.props.id, this.props.state.updated_at, this.onSearchStateChange.bind(this));
  }

  onSearchStateChange() {

  }

  startSearch() {
    this.context.flux.getActions('searchActions').startSearch(this.props.projectId, this.props.id, this.props.machineId, true);
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
        <p>{this.props.startSearchErrorMessage}</p>
        <span>Choose the machine:</span>
        <SearchMachinesList searchId={this.props.id} />
        <button disabled={this.props.machineId === null} onClick={this.startSearch.bind(this)}>Start</button>
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
    const title = 'Search Manager';
    this.context.onSetTitle(title);
    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default SearchPage;
