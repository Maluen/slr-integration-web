export default class ProjectCreationStore {
  constructor() {
    const projectCreationActions = this.alt.getActions('projectCreationActions');

    this.bindAction(projectCreationActions.updateName, this.onUpdateName);
    this.bindAction(projectCreationActions.createError, this.onCreateError);
    this.bindAction(projectCreationActions.createSuccess, this.onCreateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      'name': '',
      'errorMessage': '',
    };
  }

  onUpdateName(name) {
    this.setState({ name });
  }

  onCreateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onCreateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default ProjectCreationStore;
