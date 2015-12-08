/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachineCreationPage.scss';
import withStyles from '../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';

@withStyles(styles)
@connectToStores
class MachineCreationPage extends Component {

  static propTypes = {
    hostname: PropTypes.string,
    port: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
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
    this.machineCreationActions.create(this.props.hostname, this.props.port);
  }

  render() {
    const title = 'Create new machine';
    this.context.onSetTitle(title);
    return (
      <div className="MachineCreationPage">
        <div className="MachineCreationPage-container">
          <h1>{title}</h1>
          <div>{this.props.errorMessage}</div>
          <form onSubmit={this.handleSubmit.bind(this)}>
            <p>
              <label>Hostname</label>
              <input type="text" value={this.props.hostname} onChange={this.handleHostnameChange.bind(this)} />
            </p>

            <p>
              <label>Port</label>
              <input type="text" value={this.props.port} onChange={this.handlePortChange.bind(this)} />
            </p>

            <input type="submit" value="Create" />
          </form>
        </div>
      </div>
    );
  }

}

export default MachineCreationPage;
