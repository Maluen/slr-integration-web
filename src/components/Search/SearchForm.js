/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import searchSettings from '../../constants/searchSettings';

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
      <form onSubmit={this.props.onSubmit}>
        <p>
          <label>Name</label>
          <input type="text" value={this.props.name} onChange={this.props.onNameChange} />
        </p>

        <fieldset>
          <legend>Settings:</legend>
          {this.props.settings.map(({ name, value }) =>
            <p key={name}>
              <span>{searchSettings[name].description}:</span>
              <input type="text" name={name} value={value} onChange={this.props.onSettingsChange} /><br />
            </p>
          )}
        </fieldset>

        <input type="submit" value="Save" />
      </form>
    );
  }

}

export default SearchForm;
