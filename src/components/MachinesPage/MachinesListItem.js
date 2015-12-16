import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class MachineListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    hostname: PropTypes.string.isRequired,
    port: PropTypes.string.isRequired,
  };

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.hostname}</span>:<span>{this.props.port}</span>&nbsp;
        <a className="MachineListItem-link" href={`/updateMachine/${this.props.id}`} onClick={Link.handleClick}>Edit</a>&nbsp;
        <a className="MachineListItem-link" href={`/machineAccesses/${this.props.id}`} onClick={Link.handleClick}>Share</a>
      </li>
    );
  }

}

export default MachineListItem;
