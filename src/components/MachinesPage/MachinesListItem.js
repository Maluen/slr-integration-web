import React, { PropTypes, Component } from 'react';

class MachinesList extends Component {

  static propTypes = {
    _id: PropTypes.string,
    hostname: PropTypes.string,
    port: PropTypes.string,
  };

  render() {
    return (
      <li key={this.props._id}>
        <span>{this.props.hostname}</span>:<span>{this.props.port}</span>
      </li>
    );
  }

}

export default MachinesList;
