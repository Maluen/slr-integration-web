import React, { PropTypes, Component } from 'react';
import Link from '../../Link';

class MachineListItem extends Component {

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

  handleDeleteClick() {
    this.context.flux.getActions('machinesActions').deleteMachine(this.props.id);
  }

  render() {
    return (
      <li key={this.props.id}>
        <div className="meta">
          <p className="name">{this.props.name}</p>
          <p className="id">Id: {this.props.id}</p>
        </div>
        <div className="controls">
          <a className="ListItem-link hint--bottom" data-hint="Edit" href={`/updateMachine/${this.props.id}`} onClick={Link.handleClick}>
            <i className="fa fa-edit fa-lg"></i>
          </a>
          <a className="ListItem-link hint--bottom" data-hint="Users" href={`/machineAccesses/${this.props.id}`} onClick={Link.handleClick}>
            <i className="fa fa-users fa-lg"></i>
          </a>
          <a className="ListItem-link hint--bottom" data-hint="Remove" href="javascript:void(0);" onClick={this.handleDeleteClick.bind(this)}>
            <i className="fa fa-remove fa-lg"></i>
          </a>
        </div>
      </li>
    );
  }

}

export default MachineListItem;
