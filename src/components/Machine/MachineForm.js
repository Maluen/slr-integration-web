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
      <form onSubmit={this.props.onSubmit} className="pure-form pure-form-stacked">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={this.props.name} onChange={this.props.onNameChange} />
          </div>

          <div className="pure-control-group">
            <label htmlFor="password">Password</label>
            <input id="password" type="password" value={this.props.password} onChange={this.props.onPasswordChange} />
          </div>

          {/*
          <div className="pure-control-group">
            <label htmlFor="hostname">Hostname</label>
            <input id="hostname" type="text" value={this.props.hostname} onChange={this.props.onHostnameChange} />
          </div>

          <div className="pure-control-group">
            <label htmlFor="port">Port</label>
            <input id="port" type="text" value={this.props.port} onChange={this.props.onPortChange} />
          </div>
          */}
        </fieldset>

        <button type="submit" className="pure-button pure-button-primary">Save</button>
      </form>
    );
  }

}

export default MachineForm;
