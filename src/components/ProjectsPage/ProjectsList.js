/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ProjectListItem from './ProjectsListItem';

class ProjectsList extends Component {

  static propTypes = {
    projects: PropTypes.array,
  };

  static defaultProps = {
    projects: [],
  };

  render() {
    return (
      <div className="ProjectsList">
        <div className="ProjectsList-container">
          <ul>
            {this.props.projects.map((project) =>
              <ProjectListItem key={project.id} {...project} />
            )}
          </ul>
        </div>
      </div>
    );
  }

}

export default ProjectsList;
