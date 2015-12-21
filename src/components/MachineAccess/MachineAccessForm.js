/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class MachineAccessForm extends Component {

  static propTypes = {
    email: PropTypes.string,
    permission: PropTypes.string,
    onSubmit: PropTypes.func,
    onEmailChange: PropTypes.func,
    onPermissionChange: PropTypes.func,
  };

  static defaultProps = {
    email: '',
    permission: '',
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit}>
        <p>
          <label>Email</label>
          <input type="text" value={this.props.email} onChange={this.props.onEmailChange} />
        </p>

        <p>
          <label>Permission</label>
          <select value={this.props.permission} onChange={this.props.onPermissionChange}>
            <option value="Administrator">Administrator</option>
          </select>
        </p>

        <input type="submit" value="Save" />
      </form>
    );
  }

}

export default MachineAccessForm;
