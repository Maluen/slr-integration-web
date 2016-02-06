export default class MachineUpdationStore {
  constructor() {
    this.exportPublicMethods({
      setState: this.setState,
      getInitialState: this.getInitialState,
      reset: this.reset,
      fetchBefore: this.fetchBefore,
      fetch: this.fetch,
      onReset: this.onReset,
      onFetchBefore: this.onFetchBefore,
    });

    const machineUpdationActions = this.alt.getActions('machineUpdationActions');

    this.bindAction(machineUpdationActions.reset, this.onReset);
    this.bindAction(machineUpdationActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machineUpdationActions.fetchSuccess, this.onFetchSuccess);
    this.bindAction(machineUpdationActions.fetchError, this.onFetchError);
    this.bindAction(machineUpdationActions.updateName, this.onUpdateName);
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
      fetchErrorMessage: '',
      'id': '',
      'name': '',
      'hostname': '',
      'port': '',
      'errorMessage': '',
    };
  }

  reset() {
    this.onReset();
  }

  fetchBefore() {
    this.onFetchBefore();
  }

  fetch(...args) {
    this.fetchBefore();
    return this.alt.getActions('machineUpdationActions').fetch(...args);
  }

  onReset() {
    this.setState(this.getInitialState());
  }

  onFetchBefore() {
    this.setState({
      isFetching: true,
      isFetched: false,
      fetchErrorMessage: '',
    });
  }

  onFetchSuccess(machine) {
    this.setState({
      isFetching: false,
      isFetched: true,
      ...machine,
      errorMessage: '',
    });
  }

  onFetchError(errorMessage) {
    this.setState({
      isFetching: false,
      isFetched: true,
      fetchErrorMessage: errorMessage,
    });
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

  onUpdateError(errorMessage) {
    this.setState({ errorMessage });
  }

  onUpdateSuccess() {
    this.setState(this.getInitialState());
  }
}

export default MachineUpdationStore;
