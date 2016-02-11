import React, { PropTypes, Component } from 'react';
import Link from '../../Link';

class UserMachineListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  handleSearchMachineChange(event) {
    const machineId = event.currentTarget.value.trim();
    this.context.flux.getActions('searchActions').selectMachine(machineId);
  }

  render() {
    return (
      <li key={this.props.id}>
        <input
          type="radio"
          name="searchMachine"
          value={this.props.id}
          onChange={this.handleSearchMachineChange.bind(this)}
        />
        <span>{this.props.name}</span> <span>{this.props.hostname}</span>:<span>{this.props.port}</span>
      </li>
    );
  }

}

export default UserMachineListItem;
