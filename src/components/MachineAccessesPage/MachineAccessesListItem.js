import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class MachineAccessesListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    permission: PropTypes.string.isRequired,
  };

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.user.email}</span> <span>({this.props.permission})</span>
      </li>
    );
  }

}

export default MachineAccessesListItem;
