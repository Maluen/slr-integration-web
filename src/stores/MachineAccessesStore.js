export default class MachineUpdationStore {
  constructor() {
    const machineAccessesActions = this.alt.getActions('machineAccessesActions');

    this.bindAction(machineAccessesActions.reset, this.onReset);
    this.bindAction(machineAccessesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machineAccessesActions.fetch, this.onFetch);
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      isFetching: false,
      isFetched: false,
      machine: null,
      machineAccesses: [],
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

  onFetch({ machine, machineAccesses }) {
    this.setState({
      isFetching: false,
      isFetched: true,
      machine,
      machineAccesses,
    });
  }
}

export default MachineUpdationStore;
