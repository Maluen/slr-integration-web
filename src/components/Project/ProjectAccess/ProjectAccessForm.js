/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class ProjectAccessForm extends Component {

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
      <form onSubmit={this.props.onSubmit} className="pure-form pure-form-stacked">
        <fieldset>
          <div className="pure-g">
            <div className="pure-u-1 pure-u-md-1-3">
                <label htmlFor="Email">Email</label>
                <input type="text" value={this.props.email} onChange={this.props.onEmailChange} className="pure-u-23-24" />
            </div>

            <div className="pure-u-1 pure-u-md-1-3">
                <label htmlFor="permission">Permission</label>
                <select id="permission" value={this.props.permission} onChange={this.props.onPermissionChange} className="pure-input-1-2">
                  <option value="Administrator">Administrator</option>
                </select>
            </div>
          </div>
        </fieldset>

        <button type="submit" className="pure-button pure-button-primary">Save</button>
      </form>
    );
  }

}

export default ProjectAccessForm;
