export default class MachineUpdationStore {
  constructor() {
    const machineUpdationActions = this.alt.getActions('machineUpdationActions');

    this.bindAction(machineUpdationActions.reset, this.onReset);
    this.bindAction(machineUpdationActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machineUpdationActions.fetch, this.onFetch);
    this.bindAction(machineUpdationActions.updateHostname, this.onUpdateHostname);
    this.bindAction(machineUpdationActions.updatePort, this.onUpdatePort);
    this.bindAction(machineUpdationActions.updateError, this.onUpdateError);
    this.bindAction(machineUpdationActions.updateSuccess, this.onUpdateSuccess);

    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      'id': '',
      'hostname': '',
      'port': '',
      'errorMessage': '',
    };
  }

  onReset() {
    this.setState(this.getInitialState());
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
    });
  }

  onFetch(machine) {
    this.setState({
      isFetching: false,
      isFetched: true,
      ...machine,
      errorMessage: '',
    });
  }

  onUpdateHostname(hostname) {
    this.setState({ hostname });
  }

  onUpdatePort(port) {
    this.setState({ port });
  }

  onUpdateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onUpdateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default MachineUpdationStore;
