/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ProjectAccessesListItem from './ProjectAccessesListItem';

class ProjectAccessesList extends Component {

  static propTypes = {
    projectAccesses: PropTypes.array,
  };

  static defaultProps = {
    projectAccesses: [],
  };

  render() {
    return (
      <div className="ProjectAccessesList">
        <div className="ProjectAccessesList-container">
          <ul>
            {this.props.projectAccesses.map((projectAccess) =>
              <ProjectAccessesListItem key={projectAccess.id} {...projectAccess} />
            )}
          </ul>
        </div>
      </div>
    );
  }

}

export default ProjectAccessesList;
