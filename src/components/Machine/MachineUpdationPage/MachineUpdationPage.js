/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachineUpdationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import MachineForm from '../MachineForm.js';

@withStyles(styles)
@connectToStores
class MachineCreationPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    fetchErrorMessage: PropTypes.string,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    password: PropTypes.string,
    hostname: PropTypes.string,
    port: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    fetchErrorMessage: '',
    name: '',
    password: '',
    hostname: '',
    port: '',
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.machineUpdationActions = this.context.flux.getActions('machineUpdationActions');
  }

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('machineUpdationStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getStore('machineUpdationStore').fetch(this.props.id);
    }
  }

  componentWillUnmount() {
    this.context.flux.getStore('machineUpdationStore').reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('machineUpdationStore')];
  }

  static getPropsFromStores(props, context) {
    const state = context.flux.getStore('machineUpdationStore').getState();
    return {
      ...state,
      id: props.id, // keep passed id
    };
  }

  handleNameChange(event) {
    const name = event.currentTarget.value;
    this.machineUpdationActions.updateName(name);
  }

  handlePasswordChange(event) {
    const password = event.currentTarget.value;
    this.machineUpdationActions.updatePassword(password);
  }

  handleHostnameChange(event) {
    const hostname = event.currentTarget.value;
    this.machineUpdationActions.updateHostname(hostname);
  }

  handlePortChange(event) {
    const port = event.currentTarget.value;
    this.machineUpdationActions.updatePort(port);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.machineUpdationActions.update(this.props.id, this.props.name, this.props.password, this.props.hostname, this.props.port);
  }

  renderLoading() {
    return <p>Loading...</p>;
  }

  renderFetchError() {
    return <p><b>Load error</b>: {this.props.fetchErrorMessage}</p>;
  }

  renderFetchSuccess() {
    return (
      <div>
        <div>{this.props.errorMessage}</div>
        <p>Id: {this.props.id}</p>
        <MachineForm
          name={this.props.name}
          password={this.props.password}
          hostname={this.props.hostname}
          port={this.props.port}
          onSubmit={this.handleSubmit.bind(this)}
          onNameChange={this.handleNameChange.bind(this)}
          onPasswordChange={this.handlePasswordChange.bind(this)}
          onHostnameChange={this.handleHostnameChange.bind(this)}
          onPortChange={this.handlePortChange.bind(this)}
        />
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
    const title = 'Update machine';
    this.context.onSetTitle(title);
    return (
      <div className="MachineUpdationPage">
        <div className="MachineUpdationPage-container">
          <h1>{title}</h1>
          {this.renderFetch()}
        </div>
      </div>
    );
  }

}

export default MachineCreationPage;
