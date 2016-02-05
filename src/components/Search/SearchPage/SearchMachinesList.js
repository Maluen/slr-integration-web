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
    machines: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchMachinesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getActions('searchMachinesActions').fetch(this.props.searchId);
    }
  }

  componentWillUnmount() {
    this.context.flux.getActions('searchMachinesActions').reset();
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
              <li>
                <input type="radio" name="searchMachine" value="local" />
                <span>My local machine</span>
              </li>
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
