/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MachineAccessCreationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import MachineAccessForm from '../MachineAccess/MachineAccessForm.js';

@withStyles(styles)
@connectToStores
class MachineAccessCreationPage extends Component {

  static propTypes = {
    machineId: PropTypes.string.isRequired,
    email: PropTypes.string,
    permission: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    email: '',
    permission: 'Administrator',
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.machineAccessCreationActions = this.context.flux.getActions('machineAccessCreationActions');
  }

  static getStores(props, context) {
    return [context.flux.getStore('machineAccessCreationStore')];
  }

  static getPropsFromStores(props, context) {
    return {
      ...context.flux.getStore('machineAccessCreationStore').getState(),
      machineId: props.machineId,
    };
  }

  handleEmailChange(event) {
    const email = event.currentTarget.value;
    this.machineAccessCreationActions.updateEmail(email);
  }

  handlePermissionChange(event) {
    const permission = event.currentTarget.value;
    this.machineAccessCreationActions.updatePermission(permission);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.machineAccessCreationActions.create(this.props.machineId, this.props.email, this.props.permission);
  }

  render() {
    const title = 'Add access to the machine';
    this.context.onSetTitle(title);
    return (
      <div className="MachineAccessCreationPage">
        <div className="MachineAccessCreationPage-container">
          <h1>{title}</h1>
          <div>{this.props.errorMessage}</div>
          <MachineAccessForm
            email={this.props.email}
            permission={this.props.permission}
            onSubmit={this.handleSubmit.bind(this)}
            onEmailChange={this.handleEmailChange.bind(this)}
            onPermissionChange={this.handlePermissionChange.bind(this)}
          />
        </div>
      </div>
    );
  }

}

export default MachineAccessCreationPage;
