export default class MachineUpdationStore {
  constructor() {
    const machineAccessesActions = this.alt.getActions('machineAccessesActions');

    this.bindAction(machineAccessesActions.reset, this.onReset);
    this.bindAction(machineAccessesActions.fetchBefore, this.onFetchBefore);
    this.bindAction(machineAccessesActions.fetch, this.onFetch);
    this.bindAction(machineAccessesActions.deleteMachineAccess, this.onDeleteMachineAccess);
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

  onDeleteMachineAccess(machineAccess) {
    // update the machine access in the array accordingly
    const machineAccesses = this.state.machineAccesses;
    const machineAccessIndex = machineAccesses.findIndex(aMachineAccess => aMachineAccess.id === machineAccess.id);
    if (machineAccessIndex === -1) return;
    this.setState({
      machineAccesses: [
        ...machineAccesses.slice(0, machineAccessIndex),
        ...machineAccesses.slice(machineAccessIndex + 1),
      ],
    });
  }
}

export default MachineUpdationStore;