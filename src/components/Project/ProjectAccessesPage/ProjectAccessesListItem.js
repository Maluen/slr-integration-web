import React, { PropTypes, Component } from 'react';
import Link from '../../Link';

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
        <div className="meta">
          <p className="name">{this.props.user.email} ({this.props.permission})</p>
        </div>
        <div className="controls">
          <a
            className="ListItem-link hint--bottom"
            data-hint="Remove"
            href="javascript:void(0);"
            onClick={this.handleDeleteClick.bind(this)}>
            <i className="fa fa-remove fa-lg"></i>
          </a>
        </div>
      </li>
    );
  }

}

export default ProjectAccessesListItem;
