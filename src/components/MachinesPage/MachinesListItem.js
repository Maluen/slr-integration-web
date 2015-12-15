import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class MachinesList extends Component {

  static propTypes = {
    id: PropTypes.string,
    hostname: PropTypes.string,
    port: PropTypes.string,
  };

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.hostname}</span>:<span>{this.props.port}</span>
        <a className="MachineListItem-link" href={`/updateMachine/${this.props.id}`} onClick={Link.handleClick}>Edit</a>
      </li>
    );
  }

}

export default MachinesList;
