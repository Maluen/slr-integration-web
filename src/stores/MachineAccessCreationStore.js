export default class MachineAccessCreationStore {
  constructor() {
    const machineAccessCreationActions = this.alt.getActions('machineAccessCreationActions');

    this.bindAction(machineAccessCreationActions.updateEmail, this.onUpdateEmail);
    this.bindAction(machineAccessCreationActions.updatePermission, this.onUpdatePermission);
    this.bindAction(machineAccessCreationActions.createError, this.onCreateError);
    this.bindAction(machineAccessCreationActions.createSuccess, this.onCreateSuccess);

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

export default MachineAccessCreationStore;
