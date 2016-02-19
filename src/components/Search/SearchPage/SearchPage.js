/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './SearchPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import Link from '../../Link';
import SearchMachinesList from './SearchMachinesList';
import Globals from '../../../core/Globals';

@withStyles(styles)
@connectToStores
class SearchPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    projectId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    machineId: PropTypes.string,
    state: PropTypes.object,
    startSearchErrorMessage: PropTypes.string,
    stopSearchErrorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    startSearchErrorMessage: '',
    stopSearchErrorMessage: '',
  };

  async componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('searchStore').getState();
    if (!isFetched && !isFetching) {
      try {
        await this.context.flux.getStore('searchStore').fetch(this.props.projectId, this.props.id);
        this.listenToSearch();
      } catch (err) {
        // no-op
      }
    } else {
      // already fetched
      this.listenToSearch();
    }
  }

  componentWillUnmount() {
    Globals.webSocketClient.stopListeningToSearch(this.props.id);
    this.context.flux.getStore('searchStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('searchStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('searchStore').getState(),
      projectId: props.projectId,
      id: props.id,
    };
  }

  listenToSearch() {
    Globals.webSocketClient.listenToSearch(this.props.id, this.props.state.updated_at, this.onSearchStateChange.bind(this));
  }

  onSearchStateChange(searchStateChanges, type) {
    this.context.flux.getActions('searchActions').extendSearchState(searchStateChanges, type);
  }

  startNewSearch() {
    // (started on the selected machine)
    this.context.flux.getActions('searchActions').startSearch(this.props.projectId, this.props.id, this.props.machineId, false);
  }

  resumeSearch() {
    this.context.flux.getActions('searchActions').startSearch(this.props.projectId, this.props.id, this.props.state.machine, true);
  }

  stopSearch() {
    this.context.flux.getActions('searchActions').stopSearch(this.props.projectId, this.props.id, this.props.state.machine);
  }

  // http://stackoverflow.com/a/18197341
  downloadResultCSV(event) {
    event.preventDefault();

    const text = this.props.state.resultCSV;
    const filename = 'output.csv';

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderFetchError() {
    return <p><b>Load error</b>: {this.props.fetchErrorMessage}</p>;
  }

  renderOutputValue() {
    if (!this.props.state.output) return '';

    return this.props.state.output.reduce((previous, current) => {
      return previous + `[${(new Date(current.timestamp)).toLocaleTimeString()}] ${current.line}` + '\n';
    }, '');
  }

  renderFetchSuccess() {
    return (
      <div>
        <p>{this.props.startSearchErrorMessage}</p>
        {typeof this.props.state === 'undefined' || this.props.state.status === 'created' ?
          <div>
            <span>Choose the machine:</span>
            <SearchMachinesList searchId={this.props.id} />
            <button disabled={this.props.machineId === null} onClick={this.startNewSearch.bind(this)}>Start</button>
          </div>
        :
          <div>
            <p>Machine: {String(this.props.state.machine)}</p>
            <p>Status: {this.props.state.status}</p>
            {this.props.state.resultCSV ?
              <p>Output CSV: <a href="#" onClick={this.downloadResultCSV.bind(this)}>Download</a></p>
            : ''}
            {this.props.state.status === 'running' ?
              <div>
                {this.props.stopSearchErrorMessage !== '' ?
                  <p>Stop error: {this.props.stopSearchErrorMessage}</p>
                : ''}
                <p><button onClick={this.stopSearch.bind(this)}>Stop</button></p>
              </div>
            : ''}
            {this.props.state.status === 'failure' ?
              <p><button onClick={this.resumeSearch.bind(this)}>Resume</button></p>
            : ''}
            <textarea readOnly value={this.renderOutputValue()} cols="100" rows="20" />
          </div>
        }
      </div>
    );
  }

  renderFetch() {
    if (!this.props.isFetched) {
      return this.renderLoading();
    }
    if (this.props.fetchErrorMessage) {
      return this.renderFetchError();
    }
    return this.renderFetchSuccess();
  }

  render() {
    const title = 'Search Manager';
    this.context.onSetTitle(title);
    return (
      <div className="SearchPage">
        <div className="SearchPage-container">
          <h1>{title}</h1>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default SearchPage;
