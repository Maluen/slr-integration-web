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
    fetchErrorMessage: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    searches: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    searches: [],
  };

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchesStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('searchesStore').fetch(this.props.projectId);
    }
  }

  componentWillUnmount() {
    this.context.flux.getStore('searchesStore').reset();
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

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderFetchError() {
    return <p><b>Load error</b>: {this.props.fetchErrorMessage}</p>;
  }

  renderFetched(el) {
    if (!this.props.isFetched) {
      return this.renderLoading();
    }
    if (this.props.fetchErrorMessage) {
      return this.renderFetchError();
    }
    return el;
  }

  render() {
    const title = 'Searches Manager';
    this.context.onSetTitle(title);
    return (
      <div className="SearchesPage">
        <div className="SearchesPage-container">
          <h1>{title}</h1>
          <a className="SearchesPage-link SearchesPage-link-createSearch" href={`/createSearch/${this.props.projectId}`} onClick={Link.handleClick}>Create new</a>
          {this.renderFetched(
            <SearchesList projectId={this.props.projectId} searches={this.props.searches} />
          )}
        </div>
      </div>
    );
  }

}

export default SearchesPage;
