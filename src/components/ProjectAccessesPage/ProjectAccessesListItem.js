import React, { PropTypes, Component } from 'react';
import Link from '../Link';

class ProjectAccessesListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    user: PropTypes.object.isRequired,
    permission: PropTypes.string.isRequired,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  handleDeleteClick() {
    this.context.flux.getActions('projectAccessesActions').deleteProjectAccess(this.props.id);
  }

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.user.email}</span> <span>({this.props.permission})</span>&nbsp;
        <a
          className="ProjectAccessesListItem-link"
          href="javascript:void(0);"
          onClick={this.handleDeleteClick.bind(this)}>
          Remove
        </a>
      </li>
    );
  }

}

export default ProjectAccessesListItem;
