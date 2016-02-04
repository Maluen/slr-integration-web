export default class MachineCreationStore {
  constructor() {
    const machineCreationActions = this.alt.getActions('machineCreationActions');

    this.bindAction(machineCreationActions.updateName, this.onUpdateName);
    this.bindAction(machineCreationActions.updateHostname, this.onUpdateHostname);
    this.bindAction(machineCreationActions.updatePort, this.onUpdatePort);
    this.bindAction(machineCreationActions.createError, this.onCreateError);
    this.bindAction(machineCreationActions.createSuccess, this.onCreateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      'name': '',
      'hostname': '',
      'port': '',
      'errorMessage': '',
    };
  }

  onUpdateName(name) {
    this.setState({ name });
  }

  onUpdateHostname(hostname) {
    this.setState({ hostname });
  }

  onUpdatePort(port) {
    this.setState({ port });
  }

  onCreateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onCreateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default MachineCreationStore;
