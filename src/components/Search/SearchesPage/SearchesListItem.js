import React, { PropTypes, Component } from 'react';
import Link from '../../Link';

class SearchListItem extends Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  static contextTypes = {
    flux: PropTypes.object.isRequired,
  };

  handleDeleteClick() {
    this.context.flux.getActions('searchesActions').deleteSearch(this.props.id);
  }

  render() {
    return (
      <li key={this.props.id}>
        <div className="meta">
          <p className="name">
            <a href={`/search/${this.props.projectId}/${this.props.id}`} onClick={Link.handleClick}>
              {this.props.name}
            </a>
          </p>
        </div>
        <div className="controls">
          <a className="ListItem-link hint--bottom" data-hint="Open" href={`/search/${this.props.projectId}/${this.props.id}`} onClick={Link.handleClick}>
            <i className="fa fa-arrow-right fa-lg"></i>
          </a>
          <a className="ListItem-link hint--bottom" data-hint="Edit" href={`/updateSearch/${this.props.projectId}/${this.props.id}`} onClick={Link.handleClick}>
            <i className="fa fa-edit fa-lg"></i>
          </a>
          <a className="ListItem-link hint--bottom" data-hint="Remove" href="javascript:void(0);" onClick={this.handleDeleteClick.bind(this)}>
            <i className="fa fa-remove fa-lg"></i>
          </a>
        </div>
      </li>
    );
  }

}

export default SearchListItem;
