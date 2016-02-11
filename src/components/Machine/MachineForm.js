/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class MachineForm extends Component {

  static propTypes = {
    name: PropTypes.string,
    password: PropTypes.string,
    hostname: PropTypes.string,
    port: PropTypes.string,
    onSubmit: PropTypes.func,
    onNameChange: PropTypes.func,
    onPasswordChange: PropTypes.func,
    onHostnameChange: PropTypes.func,
    onPortChange: PropTypes.func,
  };

  static defaultProps = {
    name: '',
    password: '',
    hostname: '',
    port: '',
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <p>
          <label>Name</label>
          <input type="text" value={this.props.name} onChange={this.props.onNameChange} />
        </p>

        <p>
          <label>Password</label>
          <input type="password" value={this.props.password} onChange={this.props.onPasswordChange} />
        </p>

        <p>
          <label>Hostname</label>
          <input type="text" value={this.props.hostname} onChange={this.props.onHostnameChange} />
        </p>

        <p>
          <label>Port</label>
          <input type="text" value={this.props.port} onChange={this.props.onPortChange} />
        </p>

        <input type="submit" value="Save" />
      </form>
    );
  }

}

export default MachineForm;
