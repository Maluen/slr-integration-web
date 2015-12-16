/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class MachineForm extends Component {

  static propTypes = {
    hostname: PropTypes.string,
    port: PropTypes.string,
    onSubmit: PropTypes.func,
    onHostnameChange: PropTypes.func,
    onPortChange: PropTypes.func,
  };

  static defaultProps = {
    hostname: '',
    port: '',
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
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
