/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

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
            {this.props.machines.map((machine) => {
              return <li key={machine._id}>{machine.hostname}:{machine.port}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }

}

export default MachinesList;
