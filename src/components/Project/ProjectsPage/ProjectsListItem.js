import React, { PropTypes, Component } from 'react';
import Link from '../../Link';

class ProjectListItem extends Component {

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  handleDeleteClick() {
    this.context.flux.getActions('projectsActions').deleteProject(this.props.id);
  }

  render() {
    return (
      <li key={this.props.id}>
        <span>{this.props.name}</span>&nbsp;
        <a className="ProjectListItem-link" href={`/updateProject/${this.props.id}`} onClick={Link.handleClick}>Edit</a>&nbsp;
        <a className="ProjectListItem-link" href={`/projectAccesses/${this.props.id}`} onClick={Link.handleClick}>Users</a>&nbsp;
        <a className="ProjectListItem-link" href="javascript:void(0);" onClick={this.handleDeleteClick.bind(this)}>Remove</a>
      </li>
    );
  }

}

export default ProjectListItem;
