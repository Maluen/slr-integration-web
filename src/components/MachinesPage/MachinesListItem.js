import React, { PropTypes, Component } from 'react';

class MachinesList extends Component {

  static propTypes = {
    _id: PropTypes.string,
    hostname: PropTypes.string,
    port: PropTypes.string,
  };

  render() {
    return (
      <li key={this.props._id}>{this.props.hostname}:{this.props.port}</li>
    );
  }

}

export default MachinesList;
