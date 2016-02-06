/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import SearchMachinesListItem from './SearchMachinesListItem';

@connectToStores
class SearchMachinesList extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    searchId: PropTypes.string.isRequired,
    machines: PropTypes.array,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    machines: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchMachinesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('searchMachinesStore').fetch(this.props.searchId);
    }
  }

  componentWillUnmount() {
    this.context.flux.getStore('searchMachinesStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('searchMachinesStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('searchMachinesStore').getState(),
      searchId: props.searchId,
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
      <ul>
        {this.props.machines.map((machine) =>
          <SearchMachinesListItem key={machine.id} {...machine} />
        )}
      </ul>
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
    return (
      <div className="SearchMachinesList">
        <div className="SearchMachinesList-container">
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default SearchMachinesList;
