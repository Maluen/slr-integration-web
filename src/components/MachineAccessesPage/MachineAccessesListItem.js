import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class MachineAccessesListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    permission: PropTypes.string.isRequired,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  handleDeleteClick() {
    this.context.flux.getActions('machineAccessesActions').deleteMachineAccess(this.props.id);
  }

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.user.email}</span> <span>({this.props.permission})</span>&nbsp;
        <a
          className="MachineAccessesListItem-link"
          href="javascript:void(0);"
          onClick={this.handleDeleteClick.bind(this)}>
          Remove
        </a>
      </li>
    );
  }

}

export default MachineAccessesListItem;
