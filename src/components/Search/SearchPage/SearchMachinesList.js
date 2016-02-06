/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import connectToStores from 'alt/utils/connectToStores';
import SearchMachinesListItem from './SearchMachinesListItem';

@connectToStores
class SearchMachinesList extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    searchId: PropTypes.string.isRequired,
    machines: PropTypes.array,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
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

  render() {
    return (
      <div className="SearchMachinesList">
        <div className="SearchMachinesList-container">
          {this.props.isFetched ?
            <ul>
              {this.props.machines.map((machine) =>
                <SearchMachinesListItem key={machine.id} {...machine} />
              )}
            </ul>
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default SearchMachinesList;
