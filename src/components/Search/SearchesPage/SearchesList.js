/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import SearchListItem from './SearchesListItem';

class SearchesList extends Component {

  static propTypes = {
    projectId: PropTypes.string.isRequired,
    searches: PropTypes.array,
  };

  static defaultProps = {
    searches: [],
  };

  render() {
    return (
      <div className="SearchesList">
        <div className="SearchesList-container">
          <ul>
            {this.props.searches.map((search) =>
              <SearchListItem key={search.id} projectId={this.props.projectId} {...search} />
            )}
          </ul>
        </div>
      </div>
    );
  }

}

export default SearchesList;
