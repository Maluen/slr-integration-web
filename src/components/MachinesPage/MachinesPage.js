/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachinesPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../Link';
import MachinesList from './MachinesList';

@withStyles(styles)
@connectToStores
class MachinesPage extends Component {

  static propTypes = {
    machines: PropTypes.array,
    isFetching: PropTypes.bool,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    machines: [],
    isFetching: true,
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('machinesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getActions('machinesActions').fetch();
    }
  }

  static getStores(props, context) {
    return [context.flux.getStore('machinesStore')];
  }

  static getPropsFromStores(props, context) {
    return context.flux.getStore('machinesStore').getState();
  }

  render() {
    const title = 'Machines Manager';
    this.context.onSetTitle(title);
    return (
      <div className="MachinesPage">
        <div className="MachinesPage-container">
          <h1>{title}</h1>
          <a className="MachinesPage-link MachinesPage-link-createMachine" href="/createMachine" onClick={Link.handleClick}>Create new</a>
          {this.props.isFetching ?
            <p>Loading...</p>
          :
            <MachinesList machines={this.props.machines} />
          }
        </div>
      </div>
    );
  }

}

export default MachinesPage;
