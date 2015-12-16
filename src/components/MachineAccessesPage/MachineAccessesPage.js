/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachineAccessesPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../Link';
import MachineAccessesList from './MachineAccessesList';

@withStyles(styles)
@connectToStores
class MachineAccessesPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    machineId: PropTypes.string.isRequired,
    machine: PropTypes.object,
    machineAccesses: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    machine: null,
    machineAccesses: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('machineAccessesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getActions('machineAccessesActions').fetch(this.props.machineId);
    }
  }

  componentWillUnmount() {
    this.context.flux.getActions('machineAccessesActions').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('machineAccessesStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('machineAccessesStore').getState(),
      machineId: props.machineId,
    };
  }

  render() {
    const title = 'Machine Users';
    this.context.onSetTitle(title);
    return (
      <div className="MachineAccessesPage">
        <div className="MachineAccessesPage-container">
          <h1>{title}</h1>
          {this.props.isFetched ?
            <div>
              <h2>Machine {this.props.machine.hostname}:{this.props.machine.port}</h2>
              <a className="MachineAccessesPage-link MachineAccessesPage-link-createMachineAccess" href={`/createMachineAccess/${this.props.machineId}`} onClick={Link.handleClick}>Add access</a>
              <MachineAccessesList machineAccesses={this.props.machineAccesses} />
            </div>
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default MachineAccessesPage;
