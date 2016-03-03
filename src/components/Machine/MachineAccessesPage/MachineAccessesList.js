/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import MachineAccessesListItem from './MachineAccessesListItem';

class MachineAccessesList extends Component {

  static propTypes = {
    machineAccesses: PropTypes.array,
  };

  static defaultProps = {
    machineAccesses: [],
  };

  render() {
    return (
      <div className="List">
        <div className="List-container">
          <ul>
            {this.props.machineAccesses.map((machineAccess) =>
              <MachineAccessesListItem key={machineAccess.id} {...machineAccess} />
            )}
          </ul>
        </div>
      </div>
    );
  }

}

export default MachineAccessesList;
