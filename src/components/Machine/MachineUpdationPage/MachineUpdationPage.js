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
    id: PropTypes.string.isRequired,
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
    isFetched: false,
    name: '',
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
    const name = event.currentTarget.value.trim();
    this.machineUpdationActions.updateName(name);
  }

  handleHostnameChange(event) {
    const hostname = event.currentTarget.value.trim();
    this.machineUpdationActions.updateHostname(hostname);
  }

  handlePortChange(event) {
    const port = event.currentTarget.value.trim();
    this.machineUpdationActions.updatePort(port);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.machineUpdationActions.update(this.props.id, this.props.name, this.props.hostname, this.props.port);
  }

  render() {
    const title = 'Update machine';
    this.context.onSetTitle(title);
    return (
      <div className="MachineUpdationPage">
        <div className="MachineUpdationPage-container">
          <h1>{title}</h1>
          {this.props.isFetched ?
            <div>
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
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default MachineCreationPage;
