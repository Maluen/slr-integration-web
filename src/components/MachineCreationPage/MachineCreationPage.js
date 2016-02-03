/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachineCreationPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import MachineForm from '../Machine/MachineForm.js';

@withStyles(styles)
@connectToStores
class MachineCreationPage extends Component {

  static propTypes = {
    name: PropTypes.string,
    hostname: PropTypes.string,
    port: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    name: '',
    hostname: '',
    port: '',
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.machineCreationActions = this.context.flux.getActions('machineCreationActions');
  }

  static getStores(props, context) {
    return [context.flux.getStore('machineCreationStore')];
  }

  static getPropsFromStores(props, context) {
    return context.flux.getStore('machineCreationStore').getState();
  }

  handleNameChange(event) {
    const name = event.currentTarget.value.trim();
    this.machineCreationActions.updateName(name);
  }

  handleHostnameChange(event) {
    const hostname = event.currentTarget.value.trim();
    this.machineCreationActions.updateHostname(hostname);
  }

  handlePortChange(event) {
    const port = event.currentTarget.value.trim();
    this.machineCreationActions.updatePort(port);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.machineCreationActions.create(this.props.name, this.props.hostname, this.props.port);
  }

  render() {
    const title = 'Create new machine';
    this.context.onSetTitle(title);
    return (
      <div className="MachineCreationPage">
        <div className="MachineCreationPage-container">
          <h1>{title}</h1>
          <div>{this.props.errorMessage}</div>
          <MachineForm
            name={this.props.name}
            hostname={this.props.hostname}
            port={this.props.port}
            onSubmit={this.handleSubmit.bind(this)}
            onNameChange={this.handleNameChange.bind(this)}
            onHostnameChange={this.handleHostnameChange.bind(this)}
            onPortChange={this.handlePortChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default MachineCreationPage;
