/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './ProjectUpdationPage.scss';
import withStyles from '../../../decorators/withStyles';
import connectToStores from 'alt/utils/connectToStores';
import ProjectForm from '../ProjectForm.js';

@withStyles(styles)
@connectToStores
class ProjectCreationPage extends Component {

  static propTypes = {
    isFetched: PropTypes.bool,
    id: PropTypes.string.isRequired,
    name: PropTypes.string,
    errorMessage: PropTypes.string,
  };

  static contextTypes = {
    onSetTitle: PropTypes.func.isRequired,
    flux: PropTypes.object.isRequired,
  };

  static defaultProps = {
    isFetched: false,
    name: '',
    errorMessage: '',
  };

  constructor(...args) {
    super(...args);

    this.projectUpdationActions = this.context.flux.getActions('projectUpdationActions');
  }

  componentWillMount() {
    // TODO: don't fetch if it's already loading
    const { isFetched, isFetching } = this.context.flux.getStore('projectUpdationStore').getState();
    if (!isFetched && !isFetching) {
      this.context.flux.getActions('projectUpdationActions').fetch(this.props.id);
    }
  }

  componentWillUnmount() {
    this.projectUpdationActions.reset();
  }

  static getStores(props, context) {
    return [context.flux.getStore('projectUpdationStore')];
  }

  static getPropsFromStores(props, context) {
    const state = context.flux.getStore('projectUpdationStore').getState();
    return {
      ...state,
      id: props.id, // keep passed id
    };
  }

  handleNameChange(event) {
    const name = event.currentTarget.value.trim();
    this.projectUpdationActions.updateName(name);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.projectUpdationActions.update(this.props.id, this.props.name);
  }

  render() {
    const title = 'Update project';
    this.context.onSetTitle(title);
    return (
      <div className="ProjectUpdationPage">
        <div className="ProjectUpdationPage-container">
          <h1>{title}</h1>
          {this.props.isFetched ?
            <div>
              <div>{this.props.errorMessage}</div>
              <ProjectForm
                name={this.props.name}
                onSubmit={this.handleSubmit.bind(this)}
                onNameChange={this.handleNameChange.bind(this)}
              />
            </div>
          :
            <p>Loading...</p>
          }
        </div>
      </div>
    );
  }

}

export default ProjectCreationPage;
