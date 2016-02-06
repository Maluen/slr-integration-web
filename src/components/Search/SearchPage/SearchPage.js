/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import SearchMachinesList from './SearchMachinesList';

@withStyles(styles)
@connectToStores
class SearchPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    machineId: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('searchStore').fetch(this.props.projectId, this.props.id);
    }
  }

  componentWillUnmount() {
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

  render() {
    const title = 'Search Manager';
    this.context.onSetTitle(title);
    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>
          {this.props.isFetched ?
            <div>
              <span>Choose the machine:</span>
              <SearchMachinesList searchId={this.props.id} />
              <button disabled={this.props.machineId === null}>Start</button>
            </div>
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default SearchPage;
