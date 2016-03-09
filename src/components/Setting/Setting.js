/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import range from 'lodash.range';

class Setting extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    spec: PropTypes.object.isRequired,
    id: PropTypes.string.isRequired,
    onSettingsChange: PropTypes.func.isRequired,
  };

  onSettingsChange(event) {
    const el = event.currentTarget;

    const name = el.name.trim();

    let value = '';
    if (el.type === 'checkbox') {
      value = String(el.checked);
    } else if (el.tagName === 'SELECT') {
      value = Array.from(el.options).filter(opt => opt.selected).map(opt => opt.value).join(', ');
    } else {
      value = el.value;
    }

    this.props.onSettingsChange(name, value);
  }

  render() {
    const { name, value, spec, id } = this.props;

    const view = spec.view;

    if (view === 'textarea') {
      const { rows, cols } = spec;
      return <textarea id={id} name={name} value={value} rows={rows} cols={cols} onChange={this.onSettingsChange.bind(this)} />;
    }

    if (view === 'checkbox') {
      return <input id={id} type="checkbox" name={name} checked={value === 'true'} onChange={this.onSettingsChange.bind(this)} />;
    }

    if (view === 'select' || view === 'yearpicker') {
      let options = spec.options || [];
      if (options.length === 0 && view === 'yearpicker') {
        const firstYear = spec.firstYear;
        const currentYear = new Date().getFullYear();
        options = range(firstYear, currentYear + 1);
      }

      const multiple = spec.multiple || false;

      return (
        <select id={id} name={name} multiple={multiple} value={multiple ? value.split(', ') : value} onChange={this.onSettingsChange.bind(this)}>
          {spec.none === true ?
            <option value="">(none)</option>
          : ''}
          {options.map((optionName, key) =>
            <option key={key} value={optionName}>{optionName}</option>
          )}
        </select>
      );
    }

    // default
    return (
      <input id={id} type="text" name={name} value={value} onChange={this.onSettingsChange.bind(this)} />
    );
  }

}

export default Setting;
