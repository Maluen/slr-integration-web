import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class MachineListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  handleDeleteClick() {
    this.context.flux.getActions('machinesActions').deleteMachine(this.props.id);
  }

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.hostname}</span>:<span>{this.props.port}</span>&nbsp;
        <a className="MachineListItem-link" href={`/updateMachine/${this.props.id}`} onClick={Link.handleClick}>Edit</a>&nbsp;
        <a className="MachineListItem-link" href={`/machineAccesses/${this.props.id}`} onClick={Link.handleClick}>Users</a>&nbsp;
        <a className="MachineListItem-link" href="javascript:void(0);" onClick={this.handleDeleteClick.bind(this)}>Remove</a>
      </li>
    );
  }

}

export default MachineListItem;
