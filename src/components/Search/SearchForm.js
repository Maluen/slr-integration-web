/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class SearchForm extends Component {

  static propTypes = {
    name: PropTypes.string,
    onSubmit: PropTypes.func,
    onNameChange: PropTypes.func,
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

        <input type="submit" value="Save" />
      </form>
    );
  }

}

export default SearchForm;
