/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import searchSettings from '../../constants/searchSettings';
import Setting from '../Setting';

class SearchForm extends Component {

  static propTypes = {
    name: PropTypes.string,
    settings: PropTypes.array,
    onSubmit: PropTypes.func,
    onNameChange: PropTypes.func,
    onSettingsChange: PropTypes.func,
  };

  static defaultProps = {
    name: '',
  };

  render() {
    return (
      <form onSubmit={this.props.onSubmit} className="pure-form pure-form-stacked">
        <fieldset>
          <div className="pure-control-group">
            <label htmlFor="name">Name</label>
            <input id="name" type="text" value={this.props.name} onChange={this.props.onNameChange} />
          </div>
        </fieldset>

        <fieldset>
          <legend>Settings:</legend>
          {this.props.settings.map(({ name, value }) =>
            <div key={name} className="pure-control-group">
              <label htmlFor={`searchSetting_${name}`}>{searchSettings[name].description}:</label>
              <Setting
                name={name}
                value={value}
                spec={searchSettings[name]}
                id={`searchSetting_${name}`}
                onSettingsChange={this.props.onSettingsChange}
              />
              <br />
            </div>
          )}
        </fieldset>

        <button type="submit" className="pure-button pure-button-primary">Save</button>
      </form>
    );
  }

}

export default SearchForm;
