/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';

class MachinesList extends Component {

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
  };

  render() {
    return (
      <div className="MachinesList">
        <div className="MachinesList-container">
          <ul>
            
          </ul>
        </div>
      </div>
    );
  }

}

export default MachinesList;
