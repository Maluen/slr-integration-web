/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchesPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import SearchesList from './SearchesList';

@withStyles(styles)
@connectToStores
class SearchesPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    projectId: PropTypes.string.isRequired,
    searches: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    searches: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getActions('searchesActions').fetch(this.props.projectId);
    }
  }

  componentWillUnmount() {
    this.context.flux.getActions('searchesActions').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('searchesStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('searchesStore').getState(),
      projectId: props.projectId,
    };
  }

  render() {
    const title = 'Searches Manager';
    this.context.onSetTitle(title);
    return (
      <div className="SearchesPage">
        <div className="SearchesPage-container">
          <h1>{title}</h1>
          <a className="SearchesPage-link SearchesPage-link-createSearch" href={`/createSearch/${this.props.projectId}`} onClick={Link.handleClick}>Create new</a>
          {this.props.isFetched ?
            <SearchesList projectId={this.props.projectId} searches={this.props.searches} />
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default SearchesPage;
