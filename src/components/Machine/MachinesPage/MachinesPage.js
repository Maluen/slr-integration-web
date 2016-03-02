/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachinesPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import MachinesList from './MachinesList';

@withStyles(styles)
@connectToStores
class MachinesPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    machines: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    machines: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('machinesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('machinesStore').fetch();
    }
  }

  static getStores(props, context) {
    return [context.flux.getStore('machinesStore')];
  }

  static getPropsFromStores(props, context) {
    return context.flux.getStore('machinesStore').getState();
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderFetchError() {
    return <p><b>Load error</b>: {this.props.fetchErrorMessage}</p>;
  }

  renderFetchSuccess() {
    return (
      <MachinesList machines={this.props.machines} />
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
    const title = 'My Machines';
    this.context.onSetTitle(title);
    return (
      <div className="MachinesPage">
        <div className="MachinesPage-container">
          <h1>{title}</h1>
          <a className="MachinesPage-link MachinesPage-link-createMachine pure-button pure-button-primary" href="/createMachine" onClick={Link.handleClick}>Create new</a>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default MachinesPage;
