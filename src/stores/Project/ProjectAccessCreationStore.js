export default class ProjectAccessCreationStore {
  constructor() {
    const projectAccessCreationActions = this.alt.getActions('projectAccessCreationActions');

    this.bindAction(projectAccessCreationActions.updateEmail, this.onUpdateEmail);
    this.bindAction(projectAccessCreationActions.updatePermission, this.onUpdatePermission);
    this.bindAction(projectAccessCreationActions.createError, this.onCreateError);
    this.bindAction(projectAccessCreationActions.createSuccess, this.onCreateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      'email': '',
      'permission': 'Administrator',
      'errorMessage': '',
    };
  }

  onUpdateEmail(email) {
    this.setState({ email });
  }

  onUpdatePermission(permission) {
    this.setState({ permission });
  }

  onCreateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onCreateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default ProjectAccessCreationStore;
