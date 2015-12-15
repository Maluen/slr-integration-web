/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import MachineListItem from './MachinesListItem';

class MachinesList extends Component {

  static propTypes = {
    machines: PropTypes.array,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  static defaultProps = {
    machines: [],
  };

  render() {
    return (
      <div className="MachinesList">
        <div className="MachinesList-container">
          <ul>
            {this.props.machines.map((machine) =>
              <MachineListItem key={machine.id} {...machine} />
            )}
          </ul>
        </div>
      </div>
    );
  }

}

export default MachinesList;
