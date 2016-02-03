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
        <span>{this.props.name}</span>&nbsp;
        <a className="SearchListItem-link" href={`/search/${this.props.id}`} onClick={Link.handleClick}>Open</a>&nbsp;
        <a className="SearchListItem-link" href={`/updateSearch/${this.props.projectId}/${this.props.id}`} onClick={Link.handleClick}>Edit</a>&nbsp;
        <a className="SearchListItem-link" href="javascript:void(0);" onClick={this.handleDeleteClick.bind(this)}>Remove</a>
      </li>
    );
  }

}

export default SearchListItem;
